import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const NewProducts = ({ items }) => {
  const { products } = items;
  return (
    <View style={styles.container}>
      {products?.map((product) => (
        <View style={styles.itemContainer} key={product._id}>
          <TouchableOpacity>
            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri: product.image,
                }}
                style={styles.image}
              />
            </View>
          </TouchableOpacity>
          <Text style={styles.name}>{product.name}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>Rs. {product.price}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 8,
    backgroundColor: "white",
  },
  itemContainer: {
    width: "38%",
    marginTop: 16,
    marginBottom: 16,
    position: "relative",
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderRadius: 20,
    borderColor: "#eaeaea",
  },
  imageContainer: {
    backgroundColor: "#eaeaea",
    paddingTop: 16,
    paddingBottom: 16,
    borderRadius: 12,
  },
  image: {
    width: 80,
    height: 80,
    alignSelf: "center",
    resizeMode: "cover",
  },
  name: {
    fontWeight: "medium",
    fontSize: 12,
    textAlign: "center",
    marginLeft: 8,
    marginRight: 8,
    marginTop: 4,
    color: "black",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 4,
    marginBottom: 4,
  },
  price: {
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "justify",
    color: "black",
  },
});

export default NewProducts;
