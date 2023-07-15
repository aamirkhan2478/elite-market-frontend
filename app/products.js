import { ScrollView, StyleSheet, Text, View } from "react-native";
import NewProducts from "../components/NewProducts";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import { showProducts } from "../redux/Product/productSlice";
import AnimatedLoader from "react-native-animated-loader";
import { useEffect } from "react";
import { showCart } from "../redux/Cart/cartSlice";

const products = () => {
  const { products, productLoading } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.auth);
  const totalPages = Math.ceil(products.totalProducts / 10);
  const dispatch = useDispatch();
  const handlePageChange = (page) => {
    dispatch(showProducts(10, page, "", ""));
  };
  useEffect(() => {
    const getCartData = () => dispatch(showCart(user._id));
    getCartData();
  }, []);
  return (
    <>
      <SearchBar />
      <ScrollView>
        {productLoading ? (
          <AnimatedLoader
            overlayColor='rgba(255,255,255,0.75)'
            speed={1}
            visible={productLoading}
          />
        ) : (
          <NewProducts items={products} />
        )}
        <Pagination
          totalPages={totalPages}
          currentPage={products.page}
          onPageChange={handlePageChange}
        />
      </ScrollView>
    </>
  );
};

export default products;

const styles = StyleSheet.create({});
