import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useFocusEffect, useRouter, useSearchParams } from "expo-router";
import { imageGallery, showProduct } from "../../../redux/Product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import LoadingButton from "../../../components/LoadingButton";
import Toast from "react-native-toast-message";

const Gallery = () => {
  const [images, setImages] = useState(product?.images);
  const [refresh, setRefresh] = useState(false);
  const { productLoading, product } = useSelector((state) => state.product);
  const { user, token } = useSelector((state) => state.auth);
  const { id } = useSearchParams();
  const dispatch = useDispatch();
  const router = useRouter();

  useFocusEffect(() => {
    setTimeout(() => {
      setRefresh(true);
    }, 500);
  });
  useEffect(() => {
    checkPermission();
  }, []);

  useFocusEffect(() => {
    if (!token || user?.isAdmin === false) {
      router.push("home");
    }
  });

  const checkPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [1, 1],
      quality: 1,
      allowsMultipleSelection: true,
    });
    if (!result.canceled) {
      setImages((prevImages) => [
        ...prevImages,
        ...result.assets.map((image) => image.uri),
      ]);
    }
  };

  const removeImage = (index) => {
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };

  const renderImageItem = ({ item, index }) => (
    <View style={styles.imageContainer}>
      <Image style={styles.image} source={{ uri: item }} />
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeImage(index)}
      >
        <Text style={styles.removeButtonText}>X</Text>
      </TouchableOpacity>
    </View>
  );

  const saveImages = () => {
    const data = {
      images,
    };
    dispatch(imageGallery(data, id));
    setImages([]);
  };

  useEffect(() => {
    const getProduct = () => dispatch(showProduct(id));
    getProduct();
    setImages(product?.images);
  }, [refresh]);

  return (
    <View style={styles.container}>
      <Button
        title={images?.length > 0 ? "Pick Images" : "Pick Image"}
        onPress={pickImage}
      />
      <FlatList
        data={images}
        renderItem={renderImageItem}
        keyExtractor={(_, index) => index.toString()}
        numColumns={3}
        contentContainerStyle={styles.imageList}
        scrollEnabled
      />
      {images?.length > 0 && (
        <LoadingButton
          btnStyles={styles.saveButton}
          indicatorColor={"white"}
          isLoading={productLoading}
          onPress={saveImages}
          textStyles={styles.saveButtonText}
        >
          {images?.length > 1 ? "Save Images" : "Save Image"}
        </LoadingButton>
      )}
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#F9F9F9",
  },
  imageList: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 20,
  },
  imageContainer: {
    position: "relative",
    margin: 5,
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: 100,
    height: 100,
  },
  removeButton: {
    position: "absolute",
    top: 5,
    right: 5,
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF0000",
    opacity: 0.8,
  },
  removeButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  btnContainer: {},
  saveButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    paddingVertical: 12,
    marginVertical: 10,
  },
  saveButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Gallery;
