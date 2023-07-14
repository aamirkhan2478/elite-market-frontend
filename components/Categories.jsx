import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

const Categories = ({ categories, getCategoryId }) => {
  const buttonHandler = (id) => {
    getCategoryId(id);
  };
  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {categories?.map((category) => (
          <View style={styles.itemContainer} key={category._id}>
            <TouchableOpacity onPress={() => buttonHandler(category._id)}>
              <Image
                source={{
                  uri: category.image,
                }}
                style={styles.image}
              />
            </TouchableOpacity>
            <Text style={styles.label}>{category.name}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    marginVertical: 6,
    backgroundColor: "white",
  },
  itemContainer: {
    marginVertical: 3,
    marginHorizontal: 3,
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  label: {
    fontWeight: "bold",
    fontSize: 10,
    color: "black",
    marginTop: 5,
    textAlign: "center",
  },
});
