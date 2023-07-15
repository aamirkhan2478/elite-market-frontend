import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";

const HeaderIcon = ({ src }) => {
  const router = useRouter();
  const { cart: cartData } = useSelector((state) => state.cart);
  const { cart } = cartData;
  const count = cart?.length;

  return (
    <TouchableOpacity onPress={() => router.push("cart")}>
      <Image source={src} style={styles.image} />
      {count > 0 && (
        <View style={styles.countContainer}>
          <Text style={styles.countText}>{count}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default HeaderIcon;

const styles = StyleSheet.create({
  image: {
    height: 40,
    width: 40,
    marginRight: 10,
    marginBottom: 3,
  },
  countContainer: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "red",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  countText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});
