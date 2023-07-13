import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import NewProducts from "../components/NewProducts";
import { useSelector } from "react-redux";
import Pagination from "../components/Pagination";

const products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { products } = useSelector((state) => state.product);
  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Perform any additional logic or data fetching here
  };
  return (
    <ScrollView>
      <NewProducts items={products} />
      <Pagination
        totalPages={5}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </ScrollView>
  );
};

export default products;

const styles = StyleSheet.create({});
