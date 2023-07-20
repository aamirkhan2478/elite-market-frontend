import React from "react";
import { Drawer } from "expo-router/drawer";
import ProfilePic from "./ProfilePic";
import { useSelector } from "react-redux";
import LogoutIcon from "./LogoutIcon";
import addProduct from "../assets/icons/add-product.png";
import DrawerIcon from "./DrawerIcon";
import HeaderIcon from "./HeaderIcon";
import { icons } from "../constants";
const Navigator = () => {
  const { token, user } = useSelector((state) => state.auth);
  const guestUser =
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";
  return (
    <>
      <Drawer
        screenOptions={{
          drawerType: "slide",
          drawerStyle: { marginTop: 50 },
        }}
      >
        <Drawer.Screen
          name='dashboard/order/[id]'
          options={{
            title: "Order",
            headerRight: () => (
              <ProfilePic src={token ? user?.pic : guestUser} />
            ),
            headerTitleAlign: "center",
            drawerItemStyle: { display: "none" },
          }}
        />
        <Drawer.Screen
          name='home'
          options={{
            title: "Home",
            headerRight: () => (
              <ProfilePic src={token ? user?.pic : guestUser} />
            ),
            headerTitleAlign: "center",
            drawerItemStyle: { display: user?.isAdmin ? "none" : "flex" },
            drawerIcon: () => <DrawerIcon src={icons.home} />,
          }}
        />
        <Drawer.Screen
          name='index'
          options={{
            title: "Home",
            drawerItemStyle: { display: "none" },
          }}
        />
        <Drawer.Screen
          name='products'
          options={{
            title: "Products",
            headerTitleAlign: "center",
            drawerItemStyle: {
              display: user?.isAdmin ? "none" : "flex",
            },
            headerRight: () => token && <HeaderIcon src={addProduct} />,
            drawerIcon: () => <DrawerIcon src={icons.products} />,
          }}
        />
        <Drawer.Screen
          name='cart'
          options={{
            title: "Cart",
            headerTitleAlign: "center",
            drawerItemStyle: {
              display: "none",
            },
          }}
        />
        <Drawer.Screen
          name='product/[id]'
          options={{
            title: "Product",
            headerTitleAlign: "center",
            drawerItemStyle: {
              display: "none",
            },
            headerRight: () => token && <HeaderIcon src={icons.addProduct} />,
          }}
        />
        <Drawer.Screen
          name='categories'
          options={{
            title: "Categories",
            headerTitleAlign: "center",
            drawerItemStyle: {
              display: user?.isAdmin ? "none" : "flex",
            },
            drawerIcon: () => <DrawerIcon src={icons.categories} />,
          }}
        />
        <Drawer.Screen
          name='profile'
          options={{
            title: user?.name,
            headerTitleAlign: "center",
            drawerItemStyle: { display: "none" },
            headerRight: () => <LogoutIcon src={icons.logout} />,
          }}
        />
        <Drawer.Screen
          name='login'
          options={{
            title: "Login",
            headerTitleAlign: "center",
            drawerItemStyle: { display: token ? "none" : "flex" },
            drawerIcon: () => <DrawerIcon src={icons.login} />,
          }}
        />
        <Drawer.Screen
          name='signup'
          options={{
            title: "SignUp",
            headerTitleAlign: "center",
            drawerItemStyle: { display: token ? "none" : "flex" },
            drawerIcon: () => <DrawerIcon src={icons.signup} />,
          }}
        />
        <Drawer.Screen
          name='update-user'
          options={{
            title: "Edit User",
            headerTitleAlign: "center",
            drawerItemStyle: { display: "none" },
          }}
        />
        <Drawer.Screen
          name='change-password'
          options={{
            title: "Change Password",
            headerTitleAlign: "center",
            drawerItemStyle: { display: "none" },
          }}
        />
        <Drawer.Screen
          name='dashboard/index'
          options={{
            title: "Dashboard",
            headerTitleAlign: "center",
            drawerItemStyle: {
              display: user?.isAdmin && token ? "flex" : "none",
            },
            drawerIcon: () => <DrawerIcon src={icons.dashboard} />,
            headerRight: () => (
              <ProfilePic src={token ? user?.pic : guestUser} />
            ),
          }}
        />
        <Drawer.Screen
          name='dashboard/add-product'
          options={{
            title: "Add Product",
            headerTitleAlign: "center",
            drawerItemStyle: {
              display: user?.isAdmin && token ? "flex" : "none",
            },
            drawerIcon: () => <DrawerIcon src={icons.addProduct} />,
          }}
        />
        <Drawer.Screen
          name='dashboard/show-products'
          options={{
            title: "Show Products",
            headerTitleAlign: "center",
            drawerItemStyle: {
              display: user?.isAdmin && token ? "flex" : "none",
            },
            drawerIcon: () => <DrawerIcon src={icons.products} />,
          }}
        />
        <Drawer.Screen
          name='dashboard/gallery/[id]'
          options={{
            title: "Gallery",
            headerTitleAlign: "center",
            drawerItemStyle: {
              display: "none",
            },
          }}
        />
        <Drawer.Screen
          name='dashboard/update-product/[id]'
          options={{
            title: "Update Product",
            headerTitleAlign: "center",
            drawerItemStyle: {
              display: "none",
            },
          }}
        />
        <Drawer.Screen
          name='dashboard/add-category'
          options={{
            title: "Add Category",
            headerTitleAlign: "center",
            drawerItemStyle: {
              display: user?.isAdmin && token ? "flex" : "none",
            },
            drawerIcon: () => <DrawerIcon src={icons.addCategory} />,
          }}
        />
        <Drawer.Screen
          name='dashboard/show-categories'
          options={{
            title: "Show Categories",
            headerTitleAlign: "center",
            drawerItemStyle: {
              display: user?.isAdmin && token ? "flex" : "none",
            },
            drawerIcon: () => <DrawerIcon src={icons.categories} />,
          }}
        />
        <Drawer.Screen
          name='dashboard/update-category/[id]'
          options={{
            title: "Update Category",
            headerTitleAlign: "center",
            drawerItemStyle: {
              display: "none",
            },
          }}
        />
        <Drawer.Screen
          name='dashboard/update-status/[id]'
          options={{
            title: "Update Status",
            headerTitleAlign: "center",
            drawerItemStyle: { display: "none" },
            drawerIcon: () => null,
          }}
        />
        <Drawer.Screen
          name='dashboard/orders'
          options={{
            title: "Orders",
            headerTitleAlign: "center",
            drawerItemStyle: {
              display: user?.isAdmin === true ? "flex" : "none",
            },
            headerTitle: "",
            drawerIcon: () => <DrawerIcon src={icons.signup} />,
          }}
        />
        <Drawer.Screen
          name='orders'
          options={{
            title: "Your Orders",
            headerTitleAlign: "center",
            drawerItemStyle: {
              display: user?.isAdmin === false ? "flex" : "none",
            },
            drawerIcon: () => <DrawerIcon src={icons.signup} />,
          }}
        />
      </Drawer>
    </>
  );
};

export default Navigator;
