import { useEffect } from "react";
import { SafeAreaView, Text } from "react-native";
import { loadUser } from "../redux/Auth/authSlice";
import { useDispatch } from "react-redux";

const Home = () => {
  return (
    <SafeAreaView>
      <Text>Home</Text>
    </SafeAreaView>
  );
};

export default Home;
