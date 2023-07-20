import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showCategories } from "../redux/Category/categorySlice";
import { featuredProduct, showProducts } from "../redux/Product/productSlice";
import Categories from "../components/Categories";
import FeaturedProducts from "../components/FeaturedProducts";
import NewProducts from "../components/NewProducts";
import { showCart } from "../redux/Cart/cartSlice";
import { specificUserOrders } from "../redux/Order/orderSlice";
import { useFocusEffect, useRouter } from "expo-router";

const Home = () => {
  const dispatch = useDispatch();
  const { cateLoading, categories } = useSelector((state) => state.category);
  const {
    productLoading,
    featuredProducts: featuredProd,
    products,
  } = useSelector((state) => state.product);
  const { user, token } = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    const loadCategories = () => dispatch(showCategories());
    const featuredProducts = () => dispatch(featuredProduct());
    const getCartData = () => dispatch(showCart(user?._id));
    const getOrders = () => dispatch(specificUserOrders(user?._id));
    const getProducts = () => dispatch(showProducts());
    getProducts();
    getOrders();
    getCartData();
    featuredProducts();
    loadCategories();
  }, []);

  const buttonHandler = (id) => {
    if (id !== products?.category?._id) {
      return;
    } else {
      dispatch(showProducts(10, 1, "", id));
      router.push("categories");
    }
  };

  useFocusEffect(() => {
    if (token && user?.isAdmin === true) {
      router.push("dashboard");
    }
  });

  return (
    <>
      <View style={styles.mainContainer}>
        {productLoading && (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              backgroundColor: "lightwhite",
            }}
          >
            <ActivityIndicator color={"blue"} size={50} />
          </View>
        )}

        <ScrollView>
          <Text style={styles.sectionTitle}>Categories</Text>
          <Categories categories={categories} getCategoryId={buttonHandler} />
          <Text style={styles.sectionTitle}>Featured Products</Text>
          <FeaturedProducts featuredProducts={featuredProd} />
          <Text style={styles.sectionTitle}>New Products</Text>
          <View style={styles.container}>
            <NewProducts items={products} />
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    marginHorizontal: 5,
    marginTop: 10,
  },
  container: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 8,
    backgroundColor: "white",
  },
  itemContainer: {
    width: "38%",
    marginTop: 16,
    marginBottom: 16,
    position: "relative",
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderRadius: 20,
    borderColor: "#eaeaea",
  },
  imageContainer: {
    backgroundColor: "#eaeaea",
    paddingTop: 16,
    paddingBottom: 16,
    borderRadius: 12,
  },
  image: {
    width: "100%",
    height: 100,
    alignSelf: "center",
    resizeMode: "cover",
  },
  name: {
    fontWeight: "medium",
    fontSize: 12,
    textAlign: "center",
    marginLeft: 8,
    marginRight: 8,
    marginTop: 4,
    color: "black",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 4,
    marginBottom: 4,
  },
  price: {
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "justify",
    color: "black",
  },
});
