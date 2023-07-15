import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { showOrders } from "../redux/Order/orderSlice";
import Pagination from "../components/Pagination";
import Modal from "../components/Modal";
import { useRouter } from "expo-router";

const orders = () => {
  const { orders: ordersData } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.auth);
  const { orders, page, totalOrders } = ordersData;
  const totalPages = Math.ceil(totalOrders / 10);
  const [visible, setVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const dispatch = useDispatch();

  const handlePageChange = (page) => {
    dispatch(showOrders(user?._id, 10, page));
  };

  const cancelHandler = () => setVisible(true);

  const modalHandler = () => setVisible(false);

  const getOrders = () => {
    dispatch(showOrders(user?._id, 10, 1));
    setRefreshing(false);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    getOrders();
  };

  return (
    <>
      <Modal
        message={
          "When the order is reached then you will return your order to the TCS"
        }
        rightBtnColor={"blue"}
        rightBtnText={"Ok"}
        modalVisible={visible}
        setModalVisible={setVisible}
        onPress={modalHandler}
        displayLeftButton={"none"}
      />
      <ScrollView
        style={{ backgroundColor: "white" }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <View style={styles.mainContainer}>
          <Text style={styles.title}>Your Orders</Text>
          <Text style={styles.noteText}>
            If you don't see your ordered now products then scroll top to refresh
            your page
          </Text>
          {orders?.map((order, i) => (
            <>
              <View key={i} style={styles.container}>
                <Text style={styles.orderNumber}>Order No. {i + 1}</Text>
                {order?.orderItems?.map((item, index) => (
                  <View key={index} style={styles.itemContainer}>
                    <TouchableOpacity
                      style={styles.itemInfo}
                      onPress={() =>
                        router.push(`product/${item?.product?._id}`)
                      }
                    >
                      {item.product.image && (
                        <Image
                          source={{ uri: item?.product?.image }}
                          style={styles.itemImage}
                        />
                      )}
                      <View>
                        <Text style={styles.itemText}>
                          Product: {item?.product?.name}
                        </Text>
                        <Text style={styles.itemText}>
                          Quantity: {item?.quantity}
                        </Text>
                        {item?.size !== "" && (
                          <View style={{ flexDirection: "row" }}>
                            <Text style={{ fontSize: 16 }}>Size: </Text>
                            <View style={styles.sizeButton}>
                              <Text style={styles.sizeText}>{item?.size}</Text>
                            </View>
                          </View>
                        )}
                        {item?.color !== "" && (
                          <View style={{ flexDirection: "row" }}>
                            <Text style={{ fontSize: 16 }}>Color:</Text>
                            <View style={styles.colorButton}>
                              <View style={styles.circle(item?.color)} />
                            </View>
                          </View>
                        )}
                      </View>
                    </TouchableOpacity>
                  </View>
                ))}
                <View
                  style={{
                    flexDirection: "row",
                    borderWidth: 1,
                    borderColor: "green",
                    borderRadius: 10,
                    justifyContent: "center",
                    alignContent: "center",
                    width: "91%",
                    marginHorizontal: "4%",
                  }}
                >
                  <Text
                    style={{
                      color: "black",
                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                  >
                    Status:{" "}
                  </Text>
                  <Text
                    style={{
                      color: "black",
                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                  >
                    {order?.status}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={cancelHandler}
                >
                  <Text style={styles.cancelText}>Cancel Order</Text>
                </TouchableOpacity>
              </View>
            </>
          ))}
          <Pagination
            currentPage={page}
            onPageChange={handlePageChange}
            totalPages={totalPages}
          />
        </View>
        {orders?.length === 0 && (
          <View style={styles.mainErrorContainer}>
            <View style={styles.errorContainer}>
              <Text style={styles.text}>
                No orders found. Please make an order and come back.
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </>
  );
};

export default orders;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
  },
  container: {
    marginVertical: 16,
    borderWidth: 1,
    borderRadius: 10,
    gap: 10,
  },
  noteText: {
    justifyContent: "center",
    alignContent: "center",
    width: "100%",
    textAlign: "center",
    color: "black",
    borderColor: "red",
    borderRadius: 5,
    fontWeight: "bold",
    borderWidth: 1,
  },
  orderNumber: {
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: "black",
    color: "white",
    height: 30,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    borderWidth: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  itemInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemImage: {
    width: 100,
    height: 100,
    marginRight: 8,
    borderRadius: 4,
    marginVertical: 8,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 4,
    width: 230,
  },
  circle: (color) => ({
    borderRadius: 50,
    borderWidth: 8,
    borderColor: color,
    marginHorizontal: 10,
    marginVertical: 5,
    justifyContent: "center",
    alignItems: "center",
  }),
  sizeText: {
    fontSize: 15,
  },
  sizeButton: {
    width: 25,
    height: 25,
    borderRadius: 25,
    borderWidth: 2,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "red",
    height: 35,
    borderRadius: 8,
    justifyContent: "center",
  },
  cancelText: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
  },
  mainErrorContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    backgroundColor: "#FFFFFF",
  },
  errorContainer: {
    borderWidth: 1,
    height: 250,
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#eaeaea",
    borderColor: "red",
  },
  text: {
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
    color: "red",
  },
});
