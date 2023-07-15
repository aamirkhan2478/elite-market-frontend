import { ScrollView, StyleSheet, Text, View, Animated } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showCategories } from "../redux/Category/categorySlice";
import AnimatedLoader from "react-native-animated-loader";
import { featuredProduct, showProducts } from "../redux/Product/productSlice";
import Categories from "../components/Categories";
import FeaturedProducts from "../components/FeaturedProducts";
import NewProducts from "../components/NewProducts";
import { showCart } from "../redux/Cart/cartSlice";
import { showOrders } from "../redux/Order/orderSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { cateLoading, categories } = useSelector((state) => state.category);
  const {
    productLoading,
    featuredProducts: featuredProd,
    products,
  } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    const loadCategories = () => dispatch(showCategories());
    const featuredProducts = () => dispatch(featuredProduct());
    const getProducts = () => dispatch(showProducts(10, 1, "", ""));
    const getCartData = () => dispatch(showCart(user._id));
    const getOrders = () => dispatch(showOrders(user?._id, 10, 1));

    getOrders();
    loadCategories();
    featuredProducts();
    getProducts();
    getCartData();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <AnimatedLoader
        overlayColor='rgba(255,255,255,0.75)'
        speed={1}
        visible={cateLoading || productLoading}
      />
      <ScrollView>
        <Text style={styles.sectionTitle}>Categories</Text>
        <Categories categories={categories} />
        <Text style={styles.sectionTitle}>Featured Products</Text>
        <FeaturedProducts featuredProducts={featuredProd} />
        <Text style={styles.sectionTitle}>New Products</Text>
        <NewProducts items={products} />
      </ScrollView>
    </View>
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
});
