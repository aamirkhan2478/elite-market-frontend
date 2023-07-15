import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import Icon from "../components/Icon";
import cross from "../assets/icons/cross.png";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "expo-router";
import { addOrder, showOrder } from "../redux/Order/orderSlice";
import { deleteCart, showCart } from "../redux/Cart/cartSlice";
import FlashMessage from "react-native-flash-message";
import AnimatedLoader from "react-native-animated-loader";

const Cart = () => {
  const { user } = useSelector((state) => state.auth);
  const { cart: userCart, cartLoading } = useSelector((state) => state.cart);
  const { orderLoading } = useSelector((state) => state.order);
  const router = useRouter();
  const { cart } = userCart;
  const { name, email, shippingAddress, city, zip, phone } = user;
  const dispatch = useDispatch();
  const [orderRefresh, setOrderRefresh] = useState(false);
  const [cartRefresh, setCartRefresh] = useState(false);

  const deleteCartData = (id) => {
    dispatch(deleteCart(id));
    setCartRefresh(true);
  };

  const getOrder = () => {
    dispatch(showOrder(user?._id, 10, 1));
    setOrderRefresh(false);
  };

  const orderHandler = () => {
    const newOrderItems = cart?.map((data) => ({
      quantity: data.quantity,
      product: data.product._id,
      size: data.size,
      color: data.color,
    }));

    const values = {
      orderItems: newOrderItems,
      shippingAddress,
      city,
      zip,
      phone,
      user: user._id,
    };
    dispatch(addOrder(values));
    dispatch(deleteCart(cart?.map((data) => data._id)));
    getOrder();
    setCartRefresh(true);
  };

  useEffect(() => {
    const getCartData = () => {
      dispatch(showCart(user?._id, 10, 1));
      setCartRefresh(false);
    };
    getCartData();
  }, [cartRefresh, dispatch, showCart, user]);

  return (
    <>
      <FlashMessage position={"top"} duration={3000} />
      <AnimatedLoader
        overlayColor='rgba(255,255,255,0.75)'
        speed={1}
        visible={cartLoading || orderLoading}
      />
      <ScrollView style={{ backgroundColor: "#eaeaea" }}>
        <View style={styles.container}>
          <Text style={styles.title}>Your Cart & Checkout Please</Text>

          <View style={styles.cartContainer}>
            <View style={styles.table}>
              <View style={styles.headerRow}>
                <Text style={styles.headerText}>Product</Text>
                <Text style={styles.headerText}>Name</Text>
                <Text style={styles.headerText}>Quantity</Text>
                <Text style={styles.headerText}>Price</Text>
                <Text style={styles.headerText}>Remove</Text>
              </View>
              {cart?.length !== 0 ? (
                cart?.map((cartData, index) => (
                  <View style={styles.row} key={index}>
                    <Image
                      source={{
                        uri: cartData?.product?.image,
                      }}
                      style={[styles.itemImage, styles.cell]}
                    />
                    <Text style={styles.cell}>{cartData?.product?.name}</Text>
                    <Text style={styles.cell}>{cartData?.quantity}</Text>
                    <Text style={styles.cell}>Rs. {cartData?.totalPrice}</Text>
                    <Icon
                      src={cross}
                      onPress={() => deleteCartData(cartData._id)}
                    />
                  </View>
                ))
              ) : (
                <View style={styles.row}>
                  <Text style={styles.cell}>Your Cart is empty</Text>
                </View>
              )}
            </View>
            {cart?.length !== 0 && (
              <View style={styles.totalButton}>
                <Text style={styles.totalButtonText}>
                  Total : {userCart?.totalAmount}
                </Text>
              </View>
            )}
          </View>
          <Text style={styles.title}>Please check your Address</Text>
          <View style={styles.addressContainer}>
            <Text style={styles.addressText}>
              Name:{" "}
              <Text style={{ fontWeight: "normal", color: "blue" }}>
                {name}
              </Text>
            </Text>
            <Text style={styles.addressText}>
              Email:{" "}
              <Text style={{ fontWeight: "normal", color: "blue" }}>
                {email?.slice(0, 15)}...
              </Text>
            </Text>
            <Text style={styles.addressText}>
              Address:{" "}
              <Text style={{ fontWeight: "normal", color: "blue" }}>
                {shippingAddress}
              </Text>
            </Text>
            <Text style={styles.addressText}>
              City:{" "}
              <Text style={{ fontWeight: "normal", color: "blue" }}>
                {city}
              </Text>
            </Text>
            <Text style={styles.addressText}>
              Zip Code:{" "}
              <Text style={{ fontWeight: "normal", color: "blue" }}>{zip}</Text>
            </Text>
            <TouchableOpacity
              style={styles.editButton("black")}
              onPress={() => router.push("update-user")}
            >
              <Text style={styles.editButtonText}>Edit Your Address</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.editButton("green")}
              onPress={orderHandler}
              disabled={cart?.length === 0}
            >
              <Text style={styles.editButtonText}>Order Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 8,
    width: "100%",
    height: "100%",
    marginBottom: 176,
  },
  title: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
    marginVertical: 8,
  },
  cartContainer: {
    width: "91.66667%",
    marginVertical: 24,
    marginHorizontal: "4%",
    backgroundColor: "#f1f5f9",
    elevation: 25,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: "#d1d5db",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  table: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginTop: 16,
  },
  headerRow: {
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  headerText: {
    flex: 1,
    fontWeight: "bold",
    color: "#333333",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  cell: {
    flex: 1,
    color: "#333333",
  },
  itemImage: {
    width: 50,
    height: 50,
    resizeMode: "cover",
    borderRadius: 50,
    marginRight: 10,
  },
  totalButton: {
    width: "90%",
    backgroundColor: "black",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 4,
    paddingVertical: 4,
    paddingHorizontal: 10,
    alignSelf: "center",
  },
  totalButtonText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
  },
  addressText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "black",
    marginVertical: 4,
  },
  addressContainer: {
    textAlign: "left",
    width: "91.66667%",
    marginVertical: 24,
    marginHorizontal: "4%",
    backgroundColor: "#f1f5f9",
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: "#d1d5db",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  input: {
    width: "90%",
    backgroundColor: "white",
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: "gray",
    paddingVertical: 4,
    paddingHorizontal: 6,
    marginBottom: 2,
    borderRadius: 10,
    fontSize: 16,
    color: "black",
  },
  editButton: (color) => ({
    width: "50%",
    backgroundColor: color,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 4,
    paddingVertical: 4,
    paddingHorizontal: 10,
    alignSelf: "center",
  }),
  editButtonText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
  },
});

export default Cart;
