import { Drawer } from "expo-router/drawer";
import * as SplashScreen from "expo-splash-screen";
import ProfilePic from "../components/ProfilePic";
import image from "../assets/images/kemal.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadUser } from "../redux/Auth/authSlice";

SplashScreen.preventAutoHideAsync();
const Layout = () => {
  const { token, user } = useSelector((state) => state.auth);
  const guestUser =
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";

  return (
    <Drawer
      screenOptions={{
        drawerType: "slide",
        drawerStyle: { marginTop: 50 },
      }}
    >
      <Drawer.Screen
        name='index'
        options={{
          title: "Home",
          headerRight: () => <ProfilePic src={token ? user?.pic : guestUser} />,
          headerTitleAlign: "center",
        }}
      />
      <Drawer.Screen
        name='profile'
        options={{
          title: "Profile",
          headerTitleAlign: "center",
          drawerItemStyle: { display: "none" },
        }}
      />
      <Drawer.Screen
        name='login'
        options={{
          title: "Login",
          headerTitleAlign: "center",
          drawerItemStyle: { display: token ? "none" : "flex" },
        }}
      />
      <Drawer.Screen
        name='signup'
        options={{
          title: "SignUp",
          headerTitleAlign: "center",
          drawerItemStyle: { display: token ? "none" : "flex" },
        }}
      />
    </Drawer>
  );
};

export default Layout;
