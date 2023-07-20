import React, { useEffect } from "react";
import { View, Text, SafeAreaView, StyleSheet, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ordersIcon from "../../assets/icons/orders.png";
import productsIcon from "../../assets/icons/products.png";
import totalSalesIcon from "../../assets/icons/total-sales.png";
import { productCount } from "../../redux/Product/productSlice";
import { totalSales, totalOrders } from "../../redux/Order/orderSlice";
import { useFocusEffect } from "expo-router/src/useFocusEffect";
import { useRouter } from "expo-router";

const Dashboard = () => {
  const { user, token, authLoading } = useSelector((state) => state.auth);
  const { productCount: products, productLoading } = useSelector(
    (state) => state.product
  );
  const {
    totalSales: sales,
    totalOrders: order,
    orderLoading,
  } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const getAllCounts = () => {
      dispatch(productCount());
      dispatch(totalSales());
      dispatch(totalOrders());
    };
    getAllCounts();
  }, []);

  useFocusEffect(() => {
    if (!token || user?.isAdmin === false) {
      router.push("home");
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.subtitle}>Personal Info</Text>
      <View style={styles.infoContainer}>
        <Image source={{ uri: user?.pic }} style={styles.profilePic} />
        <View style={styles.infoContent}>
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>Name:</Text>
            <Text style={styles.infoValue}>{user?.name}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>Email:</Text>
            <Text style={styles.infoValue}>{user?.email}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.subtitle}>Statistics</Text>

      <View style={styles.statisticsContainer}>
        <View style={styles.statItem}>
          <Image source={ordersIcon} style={styles.statIcon} />
          <Text style={styles.statLabel}>Orders</Text>
          <Text style={styles.statValue}>{order?.count}</Text>
        </View>
        <View style={styles.statItem}>
          <Image source={productsIcon} style={styles.statIcon} />
          <Text style={styles.statLabel}>Products</Text>
          <Text style={styles.statValue}>{products?.count}</Text>
        </View>
      </View>

      <View style={styles.salesContainer}>
        <Image source={totalSalesIcon} style={styles.salesIcon} />
        <Text style={styles.salesLabel}>Total Sales</Text>
        <Text style={styles.salesValue}>
          {sales?.totalsales ? sales?.totalsales : 0}
          <Text style={styles.salesCurrency}> rs</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F3F4",
  },
  subtitle: {
    fontSize: 24,
    fontWeight: "bold",
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontFamily: "serif",
    color: "#555",
  },
  infoContainer: {
    width: "90%",
    backgroundColor: "#FCEBD7",
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  infoContent: {
    marginLeft: 10,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },
  infoText: {
    fontSize: 18,
    color: "#555",
    fontWeight: "bold",
  },
  infoValue: {
    fontSize: 18,
    fontWeight: "600",
  },
  statisticsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  statItem: {
    width: "45%",
    height: 160,
    backgroundColor: "#FADBD8",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  statIcon: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  statLabel: {
    fontSize: 18,
    color: "#555",
    fontWeight: "bold",
    textAlign: "center",
  },
  statValue: {
    fontSize: 18,
    color: "#555",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5,
  },
  salesContainer: {
    width: "90%",
    backgroundColor: "#F9E79F",
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    alignSelf: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  salesIcon: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  salesLabel: {
    fontSize: 20,
    color: "#555",
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 28,
  },
  salesValue: {
    fontSize: 20,
    color: "#555",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5,
    lineHeight: 28,
  },
  salesCurrency: {
    color: "#38bdf8",
    textTransform: "uppercase",
    fontFamily: "serif",
    fontSize: 14,
  },
});

export default Dashboard;
