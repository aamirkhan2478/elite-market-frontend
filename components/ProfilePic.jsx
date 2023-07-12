import { Image, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";

const ProfilePic = ({ src }) => {
  const router = useRouter();
  const { token } = useSelector((state) => state.auth);
  return (
    <TouchableOpacity
      onPress={() => (token ? router.push("profile") : router.push("login"))}
      style={{ marginRight: 10 }}
    >
      <Image
        source={{ uri: src }}
        resizeMode='cover'
        style={{ width: 40, height: 40, borderRadius: 20 }}
      />
    </TouchableOpacity>
  );
};

export default ProfilePic;
