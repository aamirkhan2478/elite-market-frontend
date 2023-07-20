import { View, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { changePassword } from "../redux/Auth/authSlice";
import { useFocusEffect } from "expo-router";
import LoadingButton from "../components/LoadingButton";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

const ChangePassword = () => {
  const { user, token, authLoading } = useSelector((state) => state.auth);
  //These are all states
  const [data, setData] = useState({
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const buttonHandler = async () => {
    if (data.password !== confirmPassword) {
      Toast.show({
        text1: "Password is not match",
        type: "error",
        visibilityTime: 2500,
      });
      return;
    }

    dispatch(changePassword(data, user?._id));

    setData({ password: "" });
    setConfirmPassword("");
  };

  useFocusEffect(() => {
    if (token && user?.isAdmin === true) {
      router.push("dashboard");
    } else if (!token) {
      router.push("home");
    }
  });

  const createConfig = {
    success: (props) => (
      <BaseToast
        {...props}
        style={{ backgroundColor: "green" }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 17,
          color: "white",
        }}
      />
    ),
    error: (props) => (
      <ErrorToast
        {...props}
        style={{ backgroundColor: "red" }}
        text1Style={{
          fontSize: 17,
          color: "white",
        }}
        text2Style={{
          fontSize: 15,
          color: "white",
        }}
      />
    ),
  };
  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Password'
        style={styles.input}
        onChangeText={(value) => setData({ ...data, password: value })}
        secureTextEntry
      />
      <TextInput
        placeholder='Confirm Password'
        style={styles.input}
        onChangeText={(value) => setConfirmPassword(value)}
        secureTextEntry
      />
      <LoadingButton
        btnStyles={styles.button}
        indicatorColor={"white"}
        isLoading={authLoading}
        onPress={buttonHandler}
        textStyles={styles.buttonText}
      >
        Change Password
      </LoadingButton>
      <Toast config={createConfig} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
  inputContainer: {
    height: "100%",
  },
  input: {
    width: "80%",
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginVertical: 8,
    alignSelf: "center",
  },
  button: {
    width: "80%",
    backgroundColor: "black",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginVertical: 12,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ChangePassword;
