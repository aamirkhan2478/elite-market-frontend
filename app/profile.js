import React from "react";
import Card from "../components/Card";
import { useSelector } from "react-redux";

import { useFocusEffect, useRouter } from "expo-router";

const profile = () => {
  const { authLoading, user, token } = useSelector((state) => state.auth);
  const router = useRouter();

  useFocusEffect(() => {
    if (
      (token && user?.isAdmin === true) ||
      (token && user?.isAdmin === false)
    ) {
      router.push("profile");
    } else if (!token) {
      router.push("home");
    }
  });
  return (
    <>
    
      <Card />
    </>
  );
};

export default profile;
