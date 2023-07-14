import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Categories from "../components/Categories";
import { showProducts } from "../redux/Product/productSlice";
import NewProducts from "../components/NewProducts";
import Pagination from "../components/Pagination";
import AnimatedLoader from "react-native-animated-loader";

const categories = () => {
  const { categories } = useSelector((state) => state.category);
  const { products, productLoading } = useSelector((state) => state.product);
  const [categoryID, setCategoryID] = useState("");
  const dispatch = useDispatch();
  const { products: getProducts, page } = products;
  const totalPages = Math.ceil(products.totalProducts / 10);
  const buttonHandler = (id) => {
    dispatch(showProducts(10, 1, "", id));
    setCategoryID(id);
  };

  const onPageChange = (page) => {
    dispatch(showProducts(10, page, "", categoryID));
  };

  return (
    <>
      <Categories categories={categories} getCategoryId={buttonHandler} />
      <ScrollView>
        {categoryID === "" ? (
          <View style={styles.container}>
            <View style={styles.card}>
              <Text style={styles.text}>Please Select any category</Text>
            </View>
          </View>
        ) : getProducts.length === 0 ? (
          <View style={styles.container}>
            <View style={styles.card}>
              <Text style={styles.text}>No products in this category</Text>
            </View>
          </View>
        ) : productLoading ? (
          <AnimatedLoader
            overlayColor='rgba(255,255,255,0.75)'
            speed={1}
            visible={productLoading}
          />
        ) : (
          <NewProducts items={products} />
        )}
        {getProducts.length !== 0 && (
          <Pagination
            currentPage={page}
            onPageChange={onPageChange}
            totalPages={totalPages}
          />
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
