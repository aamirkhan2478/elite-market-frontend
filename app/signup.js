import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../redux/Auth/authSlice";
import { useFocusEffect, useRouter } from "expo-router";

import LoadingButton from "../components/LoadingButton";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

const signup = () => {
  //These are all states
  const [result, setResult] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const {
    authLoading,
    user: userData,
    token,
  } = useSelector((state) => state.auth);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    shippingAddress: "",
    city: "",
    zip: "",
    phone: "",
  });

  const dispatch = useDispatch();
  const router = useRouter();
  //This function is used for pick a image from gallery

  const PickImage = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Toast.show({
          text1: "Permission Denied!",
          type: "error",
        });
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setResult(result.assets[0].uri);
    }
  };

  const buttonHandler = () => {
    if (user.password !== confirmPassword) {
      Toast.show({
        text1: "Your password is not match",
        type: "error",
      });
    }

    const data = {
      ...user,
      pic: result,
    };
    dispatch(signupUser(data, router));
  };

  useFocusEffect(() => {
    if (token && userData?.isAdmin === true) {
      router.push("dashboard");
    } else if (token && userData?.isAdmin === false) {
      router.push("home");
    }
  });

  const toastConfig = {
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
        <ScrollView
          style={styles.inputContainer}
          contentContainerStyle={{ display: "flex", alignItems: "center" }}
        >
          <TouchableOpacity
            onPress={PickImage}
            style={{
              borderRadius: 50,
              height: 100,
              width: 100,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderStyle: "dotted",
              borderWidth: 4,
              borderColor: "#20232a",
            }}
          >
            {result ? (
              <Image
                source={{
                  uri: result,
                }}
                style={styles.image}
              />
            ) : (
              <Text>Upload Image</Text>
            )}
          </TouchableOpacity>
          <TextInput
            placeholder='Name'
            style={styles.input}
            onChangeText={(value) => setUser({ ...user, name: value })}
          />
          <TextInput
            placeholder='Email'
            keyboardType='email-address'
            style={styles.input}
            onChangeText={(value) => setUser({ ...user, email: value })}
          />
          <TextInput
            placeholder='Address'
            style={styles.input}
            onChangeText={(value) =>
              setUser({ ...user, shippingAddress: value })
            }
          />
          <TextInput
            placeholder='City'
            style={styles.input}
            onChangeText={(value) => setUser({ ...user, city: value })}
          />
          <TextInput
            placeholder='Zip Code'
            style={styles.input}
            onChangeText={(value) => setUser({ ...user, zip: value })}
          />
          <TextInput
            placeholder='Mobile'
            keyboardType='number-pad'
            style={styles.input}
            onChangeText={(value) => setUser({ ...user, phone: value })}
          />
          <TextInput
            placeholder='Password'
            style={styles.input}
            onChangeText={(value) => setUser({ ...user, password: value })}
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
            SignUp
          </LoadingButton>
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>Already have an Account ?</Text>
            <Text
              style={styles.footerLink}
              onPress={() => router.push("login")}
            >
              Login
            </Text>
          </View>
        </ScrollView>
        <Toast config={toastConfig} />
      </View>
    </>
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
  image: {
    height: 100,
    width: 100,
    borderRadius: 50,
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
  footerContainer: {
    width: "100%",
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

export default signup;
