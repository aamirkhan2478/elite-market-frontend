import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";
import NewProducts from "../components/NewProducts";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import { showProducts } from "../redux/Product/productSlice";

import { useEffect, useState } from "react";
import { showCart } from "../redux/Cart/cartSlice";
import { useFocusEffect } from "expo-router";

const products = () => {
  const { products, productLoading } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.auth);
  const totalPages = Math.ceil(products.totalProducts / 10);
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();
  const handlePageChange = (page) => {
    dispatch(showProducts(10, page, "", ""));
  };

  useFocusEffect(() => {
    setTimeout(() => {
      setRefresh(true);
    }, 200);
  });

  useEffect(() => {
    const getCartData = () => dispatch(showCart(user._id));
    const getProducts = () => dispatch(showProducts());
    getProducts();
    getCartData();
  }, [refresh]);
  return (
    <>
      <SearchBar />
      <ScrollView>
        {productLoading ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "lightwhite",
            }}
          >
            <ActivityIndicator color={"blue"} size={50} />
          </View>
        ) : (
          <>
            <NewProducts items={products} />
            <Pagination
              totalPages={totalPages}
              currentPage={products.page}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </ScrollView>
    </>
  );
};

export default products;

const styles = StyleSheet.create({});
