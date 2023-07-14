import { Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "expo-router";
import { logoutUser } from "../redux/Auth/authSlice";
import Modal from "./Modal";

const LogoutIcon = ({ src }) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const logoutHandler = () => {
    setVisible(true);
    setMessage("Are you sure you want to log out?");
  };
  const confirmLogout = () => {
    dispatch(logoutUser(router));
    setVisible(false);
  };
  return (
    <>
      <Modal
        modalVisible={visible}
        setModalVisible={setVisible}
        message={message}
        onPress={confirmLogout}
        leftBtnText={"No"}
        rightBtnText={"yes"}
        leftBtnColor={"blue"}
        rightBtnColor={"red"}
      />
      <TouchableOpacity onPress={logoutHandler}>
        <Image source={src} style={styles.image} />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 40,
    width: 40,
    marginRight: 10,
    marginBottom: 3,
  },
});
export default LogoutIcon;
