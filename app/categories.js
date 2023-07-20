import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Categories from "../components/Categories";
import {
  showProducts,
  showProductsByCategoryID,
} from "../redux/Product/productSlice";
import NewProducts from "../components/NewProducts";
import Pagination from "../components/Pagination";

import { useFocusEffect } from "expo-router";

const categories = () => {
  const { categories: showCategories } = useSelector((state) => state.category);
  const { productsWithCategory, productLoading } = useSelector(
    (state) => state.product
  );
  const { user, token } = useSelector((state) => state.auth);
  const [categoryID, setCategoryID] = useState("");
  const dispatch = useDispatch();
  const { page } = productsWithCategory;
  const totalPages = Math.ceil(productsWithCategory.totalProducts / 10);
  const buttonHandler = (id) => {
    dispatch(showProductsByCategoryID(id));
    setCategoryID(id);
  };

  const onPageChange = (page) => {
    dispatch(showProductsByCategoryID(categoryID, page));
  };

  useFocusEffect(() => {
    if (token && user?.isAdmin === true) {
      router.push("dashboard");
    }
  });

  return (
    <>
      <Categories categories={showCategories} getCategoryId={buttonHandler} />
      <ScrollView>
        {categoryID === "" ? (
          <View style={styles.container}>
            <View style={styles.card}>
              <Text style={styles.text}>Please Select any category</Text>
            </View>
          </View>
        ) : productsWithCategory?.products?.length === 0 ? (
          <View style={styles.container}>
            <View style={styles.card}>
              <Text style={styles.text}>No products in this category</Text>
            </View>
          </View>
        ) : productLoading ? (
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
        ) : (
          <>
            <NewProducts items={productsWithCategory} />
            <Pagination
              currentPage={page}
              onPageChange={onPageChange}
              totalPages={totalPages}
            />
          </>
        )}
      </ScrollView>
    </>
  );
};

export default categories;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 600,
  },
  card: {
    borderWidth: 1,
    height: 300,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 250,
    borderRadius: 15,
    borderColor: "orange",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "orange",
  },
});
