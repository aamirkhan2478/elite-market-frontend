import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { deleteOrder, showOrders } from "../../redux/Order/orderSlice";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect, useRouter } from "expo-router";
import Modal from "../../components/Modal";

const orders = () => {
  const { orders: allOrders, orderLoading } = useSelector(
    (state) => state.order
  );
  const { user, token } = useSelector((state) => state.auth);
  const [refreshing, setRefreshing] = useState(false);
  const [visible, setVisible] = useState(false);
  const [orderId, setOrderId] = useState("");
  const router = useRouter();

  const dispatch = useDispatch();

  const deleteHandler = (id) => {
    setOrderId(id);
    setVisible(true);
  };
  const modalHandler = () => {
    dispatch(deleteOrder(orderId));
    dispatch(showOrders());
    setVisible(false);
  };

  const renderItem = ({ item, index }) => {
    const { shippingAddress, city, zip, phone, status, totalPrice, user } =
      item;

    return (
      <View style={styles.orderContainer}>
        <Text style={styles.adminOrderId}>Order No: {index + 1}</Text>
        <Text style={styles.subHeading}>Shipping Address</Text>
        <Text style={styles.shippingText}>
          Shipping Address: {shippingAddress}
        </Text>
        <Text style={styles.shippingText}>City: {city}</Text>
        <Text style={styles.shippingText}>Zip: {zip}</Text>
        <Text style={styles.shippingText}>Phone: {phone}</Text>
        <Text style={styles.adminOrderStatus}>Status: {status}</Text>

        <Text style={styles.subHeading}>User Details</Text>
        <Text>User Name: {user?.name}</Text>
        <View style={styles.totalPriceContainer}>
          <Text style={styles.heading}>Total Price: {totalPrice} RS</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button("#007bff")}
            onPress={() => router.push(`dashboard/order/${item._id}`)}
          >
            <Text style={styles.buttonText}>Show More Details</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button("red")}
            onPress={() => deleteHandler(item._id)}
          >
            <Text style={styles.buttonText}>Delete Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const getAllOrders = () => {
    dispatch(showOrders());
    setRefreshing(false);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    getAllOrders();
  };

  useEffect(() => {
    if (token || user?.isAdmin === true) {
      getAllOrders();
    }
  }, [refreshing]);

  useFocusEffect(() => {
    if (!token || user?.isAdmin === false) {
      router.push("home");
    }
  });

  return (
    <View style={styles.container}>
      <Modal
        setModalVisible={setVisible}
        modalVisible={visible}
        leftBtnColor={"blue"}
        leftBtnText={"No"}
        rightBtnColor={"red"}
        rightBtnText={"Yes"}
        onPress={modalHandler}
        displayLeftButton={"flex"}
        displayRightButton={"flex"}
        message={"Are you sure you want to delete this order"}
      />
      <Text style={styles.heading}>Orders</Text>
      <Text style={styles.noteText}>
        If you don't see any orders then scroll top to refresh your page
      </Text>
      {orderLoading ? (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: "80%",
            backgroundColor: "lightwhite",
          }}
        >
          <ActivityIndicator color={"blue"} size={50} />
        </View>
      ) : allOrders?.length === 0 ? (
        <View style={styles.mainErrorContainer}>
          <View style={styles.errorContainer}>
            <Text style={styles.text}>
              No orders found. Please wait for customer to place an order.
            </Text>
          </View>
        </View>
      ) : (
        <FlatList
          data={allOrders}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.ordersList}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        />
      )}
    </View>
  );
};

export default orders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 24,
    marginBottom: 16,
    color: "#333333",
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
  ordersList: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  orderContainer: {
    marginBottom: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  shippingText: {
    marginBottom: 4,
    color: "#666666",
  },
  subHeading: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 12,
    marginBottom: 8,
    color: "#333333",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 5,
  },
  button: (color) => ({
    backgroundColor: color,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    opacity: 1,
  }),
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  mainErrorContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: "80%",
    backgroundColor: "#FFFFFF",
  },
  errorContainer: {
    borderWidth: 1,
    height: 300,
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
