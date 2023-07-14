import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import search from "../assets/icons/search.png";
import { useDispatch } from "react-redux";
import { showProducts } from "../redux/Product/productSlice";
const SearchBar = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const buttonHandler = () => {
    dispatch(showProducts(10, 1, query, ""));
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <TextInput
          placeholder='Search Here'
          style={styles.input}
          onChangeText={(value) => setQuery(value)}
        />
        <TouchableOpacity style={styles.button} onPress={buttonHandler}>
          <Image source={search} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: "90%",
    height: 50,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    marginBottom: 16,
    backgroundColor: "#e5e7eb",
    borderWidth: 1,
    borderColor: "gray",
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 12,
  },
  input: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 16,
    marginRight: 16,
    color: "#64748b",
  },
  icon: {
    height: 30,
    width: 30,
  },
  button: {
    height: 40,
    width: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "darkblue",
  },
});

export default SearchBar;
