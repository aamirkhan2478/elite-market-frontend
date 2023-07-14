import { Drawer } from "expo-router/drawer";
import * as SplashScreen from "expo-splash-screen";
import ProfilePic from "../components/ProfilePic";
import { useSelector } from "react-redux";
import LogoutIcon from "../components/LogoutIcon";
import { Image } from "react-native";
import home from "../assets/icons/home.png";
import dashboard from "../assets/icons/dashboard.png";
import addProduct from "../assets/icons/add-product.png";
import products from "../assets/icons/show-products.png";
import addCategory from "../assets/icons/add-category.png";
import categories from "../assets/icons/show-categories.png";
import updateProduct from "../assets/icons/update-product.png";
import updateCategory from "../assets/icons/update-category.png";
import gallery from "../assets/icons/image-gallery.png";
import signup from "../assets/icons/signup.png";
import login from "../assets/icons/login.png";
import logout from "../assets/icons/shutdown.png";
import DrawerIcon from "../components/DrawerIcon";
import HeaderIcon from "../components/HeaderIcon";

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
          drawerItemStyle: { display: user?.isAdmin ? "none" : "flex" },
          drawerIcon: () => <DrawerIcon src={home} />,
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
          drawerIcon: () => <DrawerIcon src={products} />,
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
          headerRight: () => token && <HeaderIcon src={addProduct} />,
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
          drawerIcon: () => <DrawerIcon src={categories} />,
        }}
      />
      <Drawer.Screen
        name='profile'
        options={{
          title: user?.name,
          headerTitleAlign: "center",
          drawerItemStyle: { display: "none" },
          headerRight: () => <LogoutIcon src={logout} />,
        }}
      />
      <Drawer.Screen
        name='login'
        options={{
          title: "Login",
          headerTitleAlign: "center",
          drawerItemStyle: { display: token ? "none" : "flex" },
          drawerIcon: () => <DrawerIcon src={login} />,
        }}
      />
      <Drawer.Screen
        name='signup'
        options={{
          title: "SignUp",
          headerTitleAlign: "center",
          drawerItemStyle: { display: token ? "none" : "flex" },
          drawerIcon: () => <DrawerIcon src={signup} />,
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
          drawerIcon: () => <DrawerIcon src={dashboard} />,
          headerRight: () => <ProfilePic src={token ? user?.pic : guestUser} />,
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
          drawerIcon: () => <DrawerIcon src={addProduct} />,
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
          drawerIcon: () => <DrawerIcon src={products} />,
        }}
      />
      <Drawer.Screen
        name='dashboard/gallery/[id]'
        options={{
          title: "Gallery",
          headerTitleAlign: "center",
          drawerItemStyle: {
            display: user?.isAdmin && token ? "flex" : "none",
          },
          drawerIcon: () => <DrawerIcon src={gallery} />,
        }}
      />
      <Drawer.Screen
        name='dashboard/update-product/[id]'
        options={{
          title: "Update Product",
          headerTitleAlign: "center",
          drawerItemStyle: {
            display: user?.isAdmin && token ? "flex" : "none",
          },
          drawerIcon: () => <DrawerIcon src={updateProduct} />,
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
          drawerIcon: () => <DrawerIcon src={addCategory} />,
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
          drawerIcon: () => <DrawerIcon src={categories} />,
        }}
      />
      <Drawer.Screen
        name='dashboard/update-category/[id]'
        options={{
          title: "Update Category",
          headerTitleAlign: "center",
          drawerItemStyle: {
            display: user?.isAdmin && token ? "flex" : "none",
          },
          drawerIcon: () => <DrawerIcon src={updateCategory} />,
        }}
      />
    </Drawer>
  );
};

export default Layout;
