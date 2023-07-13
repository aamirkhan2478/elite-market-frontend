import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Swiper from "react-native-swiper";
const { width } = Dimensions.get("window");

const FeaturedProducts = ({ featuredProducts }) => {
  return (
    <View style={styles.sliderContainer}>
      <Swiper
        showsButtons={true}
        style={styles.wrapper}
        autoplay
        dot={<View></View>}
        activeDot={<View></View>}
      >
        {featuredProducts?.map((featured) => (
          <>
            <View style={styles.slide} key={featured._id}>
              <Image
                source={{
                  uri: featured.image,
                }}
                style={styles.sliderImage}
              />
            </View>
            <Text style={styles.text}>{featured.name}</Text>
          </>
        ))}
      </Swiper>
    </View>
  );
};

export default FeaturedProducts;

const styles = StyleSheet.create({
  sliderContainer: {
    height: 200,
  },
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  text: {
    fontSize: 15,
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "white",
  },
  sliderImage: {
    width,
    height: 300,
    marginBottom: 20,
  },
});
