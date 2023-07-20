import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { useFocusEffect, useRouter, useSearchParams } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { showOrder, updateStatus } from "../../../redux/Order/orderSlice";
import LoadingButton from "../../../components/LoadingButton";
import { Picker } from "@react-native-picker/picker";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

const UpdateStatus = () => {
  const [status, setStatus] = useState("");
  const { id } = useSearchParams();
  const [refresh, setRefresh] = useState(false);
  const { order, orderLoading } = useSelector((state) => state.order);
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const statuses = [
    { id: 1, status: "Pending" },
    { id: 2, status: "Processing" },
    { id: 3, status: "Confirmed" },
    { id: 4, status: "Shipped" },
    { id: 5, status: "Out For Delivery" },
    { id: 6, status: "Delivered" },
    { id: 7, status: "On Hold" },
    { id: 8, status: "Cancelled" },
    { id: 9, status: "Refunded" },
    { id: 10, status: "Returned" },
    { id: 11, status: "Partially Shipped" },
    { id: 12, status: "Back Ordered" },
    { id: 13, status: "Awaiting Payment" },
    { id: 14, status: "Awaiting Fulfillment" },
    { id: 15, status: "Failed" },
  ];
  setTimeout(() => {
    setRefresh(true);
  }, 1000);
  useEffect(() => {
    const getOrder = () => {
      dispatch(showOrder(id));
      setStatus(order.status);
    };
    getOrder();
  }, [refresh]);

  useFocusEffect(() => {
    if (!token || user?.isAdmin === false) {
      router.push("home");
    } 
  });
  const handleOptionSelect = (option) => {
    setStatus(option);
  };
  const buttonHandler = () => {
    const data = {
      status,
    };
    dispatch(updateStatus(id, data, router));
    dispatch(showOrder(id));
  };

  const createConfig = {
    success: (props) => (
      <BaseToast
        {...props}
        style={{ backgroundColor: "green" }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 17,
          color: "white",
        }}
      />
    ),
    error: (props) => (
      <ErrorToast
        {...props}
        style={{ backgroundColor: "red" }}
        text1Style={{
          fontSize: 17,
          color: "white",
        }}
        text2Style={{
          fontSize: 15,
          color: "white",
        }}
      />
    ),
  };
  return (
    <SafeAreaView>
     
      <ScrollView style={{ paddingVertical: 20 }}>
        <Text style={styles.heading}>Status</Text>
        <View style={styles.container}>
          <Text style={styles.label}>Status</Text>
          <Picker
            selectedValue={status}
            style={styles.dropdown}
            onValueChange={(itemValue) => handleOptionSelect(itemValue)}
          >
            <Picker.Item label='Select an option' value='' />
            {statuses?.map((option) => (
              <Picker.Item
                key={option.id}
                label={option.status}
                value={option.status}
              />
            ))}
          </Picker>
        </View>
        <View style={styles.buttonContainer}>
          <LoadingButton
            btnStyles={styles.button}
            textStyles={styles.btnText}
            isLoading={orderLoading}
            indicatorColor={"white"}
            onPress={buttonHandler}
          >
            Update Status
          </LoadingButton>
        </View>
      </ScrollView>
      <Toast config={createConfig}/>
    </SafeAreaView>
  );
};

export default UpdateStatus;
const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
    color: "#000",
  },
  container: {
    width: "80%",
    marginHorizontal: "10%",
    paddingVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    padding: 10,
    width: "100%",
  },
  imageContainer: {
    position: "relative",
    width: "80%",
    height: 100,
    marginHorizontal: "10%",
  },
  image: {
    width: "50%",
    height: 100,
    borderRadius: 10,
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "#000",
    marginHorizontal: "25%",
  },
  buttonContainer: {
    width: "80%",
    height: 100,
    marginHorizontal: "10%",
    paddingVertical: 10,
  },
  descriptionInput: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    padding: 10,
    width: "100%",
    height: 150,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    opacity: 1,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
  },
  dropdown: {
    width: "100%",
    borderWidth: 1,
    borderColor: "black",
  },
});
