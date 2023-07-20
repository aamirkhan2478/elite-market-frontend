import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategory,
  showCategories,
} from "../../redux/Category/categorySlice";
import { useFocusEffect, useRouter } from "expo-router";
import Modal from "../../components/Modal";

const ShowCategories = () => {
  const { categories, cateLoading } = useSelector((state) => state.category);
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [categoryID, setCategoryID] = useState("");
  useEffect(() => {
    const getCategories = () => dispatch(showCategories());
    getCategories();
  }, []);

  useFocusEffect(() => {
    if (!token || user?.isAdmin === false) {
      router.push("home");
    }
  });
  const deleteHandler = (id) => {
    setCategoryID(id);
    setVisible(true);
  };
  const modalHandler = () => {
    dispatch(deleteCategory(categoryID));
    setVisible(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      {cateLoading && (
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
        message={"Are you sure you want to delete this category"}
        displayLeftButton={"flex"}
        displayRightButton={"flex"}
        leftBtnColor={"blue"}
        rightBtnColor={"red"}
        leftBtnText={"No"}
        rightBtnText={"Yes"}
        modalVisible={visible}
        setModalVisible={setVisible}
        onPress={modalHandler}
      />
      <ScrollView>
        <Text style={styles.heading}>All Categories</Text>
        {categories.map((item) => {
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
                <View style={styles.buttonGroup}>
                  <TouchableOpacity
                    style={styles.button("skyblue")}
                    onPress={() =>
                      router.push(`dashboard/update-category/${item._id}`)
                    }
                  >
                    <Text style={styles.buttonText}>Update</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button("red")}
                    onPress={() => deleteHandler(item._id)}
                  >
                    <Text style={styles.buttonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

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
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f1f1f1",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#000",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
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

export default ShowCategories;
