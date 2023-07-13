import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { changePassword } from "../redux/Auth/authSlice";

const ChangePassword = () => {
  const { user } = useSelector((state) => state.auth);
  //These are all states
  const [data, setData] = useState({
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const buttonHandler = async () => {
    if (data.password !== confirmPassword) {
      return showMessage({
        message: "Your password is not match",
        type: "danger",
        icon: "danger",
      });
    }

    dispatch(changePassword(data, user?._id));

    setData({ password: "" });
    setConfirmPassword("");
  };
  return (
    <View style={styles.container}>
      <FlashMessage position='top' duration={3000} />
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
      <TouchableOpacity style={styles.button} onPress={buttonHandler}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>
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
