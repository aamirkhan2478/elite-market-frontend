import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/Auth/authSlice";
import { useRouter } from "expo-router";

const Card = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={{ uri: user?.pic }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.name}>Name: {user?.name}</Text>
          <Text style={styles.name}>Email: {user?.email}</Text>
        </View>
        <View>
          <TouchableOpacity style={styles.blueButton}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.redButton}>
            <Text style={styles.buttonText}>Delete Account</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.redButton}>
            <Text
              style={styles.buttonText}
              onPress={() => dispatch(logoutUser(router))}
            >
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    display: "flex",
    alignItems: "center",
  },
  textContainer: {
    margin: 20,
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 12,
    borderRadius: 50,
  },
  blueButton: {
    width: "80%",
    backgroundColor: "blue",
    borderColor: "blue",
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginVertical: 2,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  redButton: {
    width: "80%",
    backgroundColor: "red",
    borderColor: "red",
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginVertical: 2,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Card;
