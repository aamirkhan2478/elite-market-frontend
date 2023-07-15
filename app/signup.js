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
import FlashMessage, { showMessage } from "react-native-flash-message";
import { useDispatch } from "react-redux";
import { signupUser } from "../redux/Auth/authSlice";
import { useRouter } from "expo-router";

const signup = () => {
  //These are all states
  const [result, setResult] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [confirmPassword, setConfirmPassword] = useState("");
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
        showMessage({
          message: "Permission Denied!",
          type: "danger",
          icon: "danger",
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

  const buttonHandler = async () => {
    if (user.password !== confirmPassword) {
      showMessage({
        message: "Your password is not match",
        type: "danger",
        icon: "danger",
      });
    }

    const data = {
      ...user,
      pic: result,
    };
    dispatch(signupUser(data, router));
  };

  return (
    <View style={styles.container}>
      <FlashMessage position='top' duration={3000} />
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
          onChangeText={(value) => setUser({ ...user, shippingAddress: value })}
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
        <TouchableOpacity style={styles.button} onPress={buttonHandler}>
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Already have an Account ?</Text>
          <Text style={styles.footerLink} onPress={() => router.push("login")}>
            Login
          </Text>
        </View>
      </ScrollView>
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
