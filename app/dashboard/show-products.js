import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, showProducts } from "../../redux/Product/productSlice";
import { useFocusEffect, useRouter } from "expo-router";
import Pagination from "../../components/Pagination";
import Modal from "../../components/Modal";

const ShowProduct = () => {
  const { products: ProductsData, productLoading } = useSelector(
    (state) => state.product
  );
  const { user, token } = useSelector((state) => state.auth);
  const { products, page, totalProducts } = ProductsData;
  const totalPages = Math.ceil(totalProducts / 10);
  const router = useRouter();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [productId, setProductId] = useState("");
  const [refresh, setRefresh] = useState(false);

  const handlePageChange = (page) => {
    dispatch(showProducts(10, page));
  };

  const buttonHandler = (id) => {
    setVisible(true);
    setProductId(id);
  };
  const modalHandler = () => {
    dispatch(deleteProduct(productId));
    setVisible(false);
    setRefresh(true);
  };

  useEffect(() => {
    const getProduct = () => dispatch(showProducts(10, page));
    getProduct();
  }, [refresh === true]);

  useFocusEffect(() => {
    if (!token || user?.isAdmin === false) {
      router.push("home");
    }
  });
  return (
    <SafeAreaView style={styles.container}>
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
      <Modal
        leftBtnColor={"blue"}
        leftBtnText={"No"}
        rightBtnColor={"red"}
        rightBtnText={"Yes"}
        message={"Are you sure you want to delete this product?"}
        onPress={modalHandler}
        modalVisible={visible}
        setModalVisible={setVisible}
      />
      <ScrollView>
        <Text style={styles.heading}>All Products</Text>
        {products?.map((item) => {
          return (
            <View key={item._id} style={styles.cardContainer}>
              <Image
                style={styles.image}
                source={{
                  uri: item.image,
                }}
              />
              <View style={styles.content}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <View style={styles.buttonGroup}>
                  <TouchableOpacity
                    style={styles.button("skyblue")}
                    onPress={() =>
                      router.push(`dashboard/update-product/${item._id}`)
                    }
                  >
                    <Text style={styles.buttonText}>Update</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button("red")}
                    onPress={() => buttonHandler(item._id)}
                  >
                    <Text style={styles.buttonText}>Delete</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button("green")}
                    onPress={() => router.push(`dashboard/gallery/${item._id}`)}
                  >
                    <Text style={styles.buttonText}>Gallery</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        })}
        <Pagination
          currentPage={page}
          onPageChange={handlePageChange}
          totalPages={totalPages}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ShowProduct;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
    marginHorizontal: "10%",
    color: "#000",
  },
  cardContainer: {
    borderWidth: 1,
    borderColor: "#eaeaea",
    borderRadius: 10,
    width: "80%",
    height: "auto",
    marginVertical: 10,
    marginHorizontal: "10%",
    display: "flex",
    flexDirection: "column",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10,
    textAlign: "center",
    color: "#000",
  },
  description: {
    fontSize: 14,
    fontWeight: "400",
    marginBottom: 10,
    marginHorizontal: 10,
    color: "#666",
    textAlign: "center",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginVertical: 10,
  },
  button: (color) => ({
    backgroundColor: color,
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 5,
  }),
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
});
