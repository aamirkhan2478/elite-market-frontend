import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "expo-router";
import Modal from "./Modal";
import { deleteUser } from "../redux/Auth/authSlice";

const Card = () => {
  const { user } = useSelector((state) => state.auth);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  const deleteHandler = () => {
    setVisible(true);
    setMessage("Are you sure you want to delete your account?");
  };

  const confirmDelete = () => {
    dispatch(deleteUser(user?._id, router));
    setVisible(false);
  };

  return (
    <>
      <Modal
        modalVisible={visible}
        setModalVisible={setVisible}
        message={message}
        onPress={confirmDelete}
        leftBtnText='No'
        rightBtnText='Yes'
        leftBtnColor='#3498db'
        rightBtnColor='#e74c3c'
      />
      <View style={styles.container}>
        <View style={styles.card}>
          <Image source={{ uri: user?.pic }} style={styles.image} />
          <View style={styles.divider} />
          <Text style={styles.heading}>User Info</Text>
          <View style={styles.textContainer}>
            <Text style={styles.paragraph}>Name: {user?.name}</Text>
            <Text style={styles.paragraph}>Email: {user?.email}</Text>
          </View>
          <Text style={styles.heading}>Your Shipping Details</Text>
          <View style={styles.textContainer}>
            <Text style={styles.paragraph}>
              Address: {user?.shippingAddress}
            </Text>
            <Text style={styles.paragraph}>City: {user?.city}</Text>
            <Text style={styles.paragraph}>Zip Code: {user?.zip}</Text>
            <Text style={styles.paragraph}>Mobile No.: {user?.phone}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button("blue")}
              onPress={() => router.push(`update-user`)}
            >
              <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button("red")}
              onPress={deleteHandler}
            >
              <Text style={styles.buttonText}>Delete Account</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button("grey")}
              onPress={() => router.push("change-password")}
            >
              <Text style={styles.buttonText}>Change Password</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
    alignItems: "center",
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 8,
    color: "#333",
  },
  textContainer: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: "flex-start",
    width: 250,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 12,
    borderRadius: 100,
  },
  divider: {
    borderBottomWidth: 1,
    width: 100,
    marginBottom: 10,
    borderColor: "#ccc",
  },
  buttonContainer: {
    width: 200,
    marginTop: 16,
  },
  button: (color) => ({
    width: 150,
    backgroundColor: color,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
  }),
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  paragraph: {
    fontSize: 15,
    color: "#333",
  },
});

export default Card;
