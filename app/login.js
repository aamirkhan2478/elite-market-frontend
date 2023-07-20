import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { loginUser } from "../redux/Auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect, useRouter } from "expo-router";

import LoadingButton from "../components/LoadingButton";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const {
    authLoading,
    user: userData,
    token,
  } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const clickHandler = () => {
    dispatch(loginUser(user, router));
  };

  useFocusEffect(() => {
    if (token && userData?.isAdmin === true) {
      router.push("dashboard");
    } else if (token && userData?.isAdmin === false) {
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
    <>
      <View style={styles.container}>
        <Text style={styles.subtitle}>Please enter your login credentials</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder='Your Email'
            keyboardType='email-address'
            style={styles.input}
            onChangeText={(value) => setUser({ ...user, email: value })}
            defaultValue={user.email}
          />
          <TextInput
            placeholder='Password'
            style={styles.input}
            onChangeText={(value) => setUser({ ...user, password: value })}
            defaultValue={user.password}
            secureTextEntry
          />
          <LoadingButton
            btnStyles={styles.button}
            indicatorColor={"white"}
            isLoading={authLoading}
            onPress={clickHandler}
            textStyles={styles.buttonText}
          >
            Login
          </LoadingButton>

          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>Don't have an Account ?</Text>
            <Text
              style={styles.footerLink}
              onPress={() => router.push("signup")}
            >
              SignUp
            </Text>
          </View>
        </View>
        <Toast config={createConfig} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    marginVertical: 8,
  },
  subtitle: {
    fontWeight: "normal",
    fontSize: 12,
    textAlign: "center",
    marginBottom: 8,
  },
  inputContainer: {
    marginTop: 8,
    height: "38%",
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
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginVertical: 12,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  footerContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  footerText: {
    fontWeight: "medium",
    fontSize: 16,
    color: "gray",
    textAlign: "center",
  },
  footerLink: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default Login;
