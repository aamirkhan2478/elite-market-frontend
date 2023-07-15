import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const Icon = ({ src, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image source={src} style={styles.image} />
    </TouchableOpacity>
  );
};

export default Icon;

const styles = StyleSheet.create({
  image: {
    height: 25,
    width: 25,
  },
});
