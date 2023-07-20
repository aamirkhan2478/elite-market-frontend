import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { showOrder } from "../../../redux/Order/orderSlice";
import { useFocusEffect, useRouter, useSearchParams } from "expo-router";

const Order = () => {
  const { order } = useSelector((state) => state.order);
  const { user: userAdmin, token } = useSelector((state) => state.auth);
  const { id } = useSearchParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const [refresh, setRefresh] = useState(false);
  const {
    orderItems,
    shippingAddress,
    city,
    zip,
    phone,
    status,
    totalPrice,
    user,
  } = order;

  setTimeout(() => {
    setRefresh(true);
  }, 1000);
  useEffect(() => {
    const getOrder = () => dispatch(showOrder(id));
    getOrder();
  }, [refresh === true]);

  useFocusEffect(() => {
    if (!token || userAdmin?.isAdmin === false) {
      router.push("home");
    } 
  });
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Order Details</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Shipping Address:</Text>
        <Text style={styles.value}>{shippingAddress}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>City:</Text>
        <Text style={styles.value}>{city}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Zip:</Text>
        <Text style={styles.value}>{zip}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Phone:</Text>
        <Text style={styles.value}>{phone}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Status:</Text>
        <Text
          style={
            status === "Pending"
              ? styles.statusValue("#FFC107")
              : status === "Processing"
              ? styles.statusValue("#007BFF")
              : status === "Confirmed"
              ? styles.statusValue("#28A745")
              : status === "Shipped"
              ? styles.statusValue("#17A2B8")
              : status === "Out For Delivery"
              ? styles.statusValue("#6610F2")
              : status === "Delivered"
              ? styles.statusValue("#198754")
              : status === "On Hold"
              ? styles.statusValue("#DC3545")
              : status === "Cancelled"
              ? styles.statusValue("#DC3545")
              : status === "Refunded"
              ? styles.statusValue("#FFC107")
              : status === "Returned"
              ? styles.statusValue("#FFC107")
              : status === "Partially Shipped"
              ? styles.statusValue("#FFC107")
              : status === "Back Ordered"
              ? styles.statusValue("#FFC107")
              : status === "Awaiting Payment"
              ? styles.statusValue("#DC3545")
              : status === "Awaiting Fulfillment"
              ? styles.statusValue("#FFC107")
              : status === "Failed"
              ? styles.statusValue("#DC3545")
              : null
          }
        >
          {status}
        </Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Total Price:</Text>
        <Text style={styles.value}>{totalPrice}</Text>
      </View>

      <Text style={styles.heading}>User Details</Text>
      <View style={styles.card}>
        <Text style={styles.value}>User Name: {user?.name}</Text>
      </View>

      <Text style={styles.heading}>Order Items</Text>
      {orderItems?.map((item) => (
        <View key={item?._id} style={styles.card}>
          <Text style={styles.productNameValue}>{item?.product?.name}</Text>
          <Image source={{ uri: item?.product?.image }} style={styles.image} />
          <Text style={styles.description}>{item?.product?.description}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.label}>Price:</Text>
            <Text style={styles.price}>{item?.product?.price}</Text>
          </View>
          <View style={styles.quantityContainer}>
            <Text style={styles.label}>Quantity:</Text>
            <Text style={styles.quantity}>{item?.quantity}</Text>
          </View>
        </View>
      ))}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push(`dashboard/update-status/${id}`)}
      >
        <Text style={styles.buttonText}>Update Status</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 16,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#333333",
  },
  card: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 4,
    color: "#666666",
  },
  value: {
    fontSize: 16,
    color: "#666666",
  },
  statusValue: (color) => ({
    fontSize: 16,
    color: color,
  }),
  itemHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333333",
  },
  productNameValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 8,
  },
  image: {
    width: "100%",
    height: 200,
    marginTop: 16,
    borderRadius: 8,
  },
  description: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  price: {
    fontSize: 14,
    color: "#333333",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantity: {
    fontSize: 14,
    color: "#333333",
    marginLeft: 4,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    opacity: 1,
    marginBottom: 35,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default Order;
