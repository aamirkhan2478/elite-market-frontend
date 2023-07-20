import { Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

const CameraIcon = ({ src, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Image source={src} style={styles.image} />
    </TouchableOpacity>
  );
};

export default CameraIcon;

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: -10,
    right: -10,
    zIndex: 1,
    backgroundColor: "blue",
    borderRadius: 50,
    padding: 5,
  },
  image: {
    height: 35,
    width: 35,
  },
});
