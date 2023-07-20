import React, { useEffect, useState } from "react";
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
import { updateUser } from "../redux/Auth/authSlice";
import { useFocusEffect, useRouter } from "expo-router";
import LoadingButton from "../components/LoadingButton";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

const UpdateUser = () => {
  const { user, token, authLoading } = useSelector((state) => state.auth);
  //These are all states
  const [result, setResult] = useState(user?.pic);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    shippingAddress: "",
    city: "",
    zip: "",
    phone: "",
  });

  const dispatch = useDispatch();
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

  const router = useRouter();
  const buttonHandler = () => {
    const data = {
      ...userData,
      pic: result,
      isAdmin: user?.isAdmin,
    };

    dispatch(updateUser(data, user?._id, router));
  };

  useEffect(() => {
    setUserData({
      name: user?.name,
      email: user?.email,
      shippingAddress: user?.shippingAddress,
      city: user?.city,
      zip: user?.zip,
      phone: user?.phone,
    });
  }, []);

  useFocusEffect(() => {
    if (
      (token && user?.isAdmin === true) ||
      (token && user?.isAdmin === false)
    ) {
      router.push("update-user");
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
          onChangeText={(value) => setUserData({ ...userData, name: value })}
          defaultValue={user?.name}
        />
        <TextInput
          placeholder='Email'
          keyboardType='email-address'
          style={styles.input}
          onChangeText={(value) => setUserData({ ...userData, email: value })}
          defaultValue={user?.email}
        />
        <TextInput
          placeholder='Address'
          style={styles.input}
          onChangeText={(value) =>
            setUserData({ ...userData, shippingAddress: value })
          }
          defaultValue={user?.shippingAddress}
        />
        <TextInput
          placeholder='City'
          style={styles.input}
          onChangeText={(value) => setUserData({ ...userData, city: value })}
          defaultValue={user?.city}
        />
        <TextInput
          placeholder='Zip Code'
          style={styles.input}
          onChangeText={(value) => setUserData({ ...userData, zip: value })}
          defaultValue={user?.zip}
        />
        <TextInput
          placeholder='Mobile'
          keyboardType='number-pad'
          style={styles.input}
          onChangeText={(value) => setUserData({ ...userData, phone: value })}
          defaultValue={user?.phone}
        />
        <LoadingButton
          btnStyles={styles.button}
          indicatorColor={"white"}
          isLoading={authLoading}
          onPress={buttonHandler}
          textStyles={styles.buttonText}
        >
          Edit User
        </LoadingButton>
      </ScrollView>
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

export default UpdateUser;
