import React from "react";
import Card from "../components/Card";
import { useSelector } from "react-redux";
import AnimatedLoader from "react-native-animated-loader";
const profile = () => {
  const { authLoading } = useSelector((state) => state.auth);
  return (
    <>
      <AnimatedLoader
        overlayColor='rgba(255,255,255,0.75)'
        speed={1}
        visible={authLoading}
      />
      <Card />
    </>
  );
};

export default profile;
