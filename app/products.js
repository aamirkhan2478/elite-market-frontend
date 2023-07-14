import { ScrollView, StyleSheet, Text, View } from "react-native";
import NewProducts from "../components/NewProducts";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import { showProducts } from "../redux/Product/productSlice";
import AnimatedLoader from "react-native-animated-loader";

const products = () => {
  const { products, productLoading } = useSelector((state) => state.product);
  const totalPages = Math.ceil(products.totalProducts / 10);
  const dispatch = useDispatch();
  const handlePageChange = (page) => {
    dispatch(showProducts(10, page, "", ""));
  };

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
