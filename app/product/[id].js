import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import cart from "../../assets/icons/add-product.png";
import plus from "../../assets/icons/plus.png";
import minus from "../../assets/icons/minus.png";
import { useDispatch, useSelector } from "react-redux";
import { showProduct } from "../../redux/Product/productSlice";
import { useRouter, useSearchParams } from "expo-router";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { addCart, showCart } from "../../redux/Cart/cartSlice";
import Modal from "../../components/Modal";

const Product = () => {
  const { product } = useSelector((state) => state.product);
  const { token, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { id } = useSearchParams();
  const [selectedImages, setSelectedImages] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [visible, setVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [totalAmount, setTotalAmount] = useState(
    quantity * (product?.price || 0)
  );
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const router = useRouter();

  const imagesHandler = (index) => {
    setSelectedImages(product?.images[index]);
    setSelectedImage("");
  };

  const imageHandler = () => {
    setSelectedImage(product?.image);
    setSelectedImages("");
  };

  const plusHandler = () => setQuantity(quantity + 1);

  const minusHandler = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const colorHandler = (color) => setSelectedColor(color);
  const sizeHandler = (size) => setSelectedSize(size);

  const cartHandler = () => {
    if (!token) {
      return setVisible(true);
    }
    const values = {
      quantity: quantity,
      totalPrice: totalAmount,
      color: selectedColor,
      size: selectedSize,
      product: product?._id,
      user: user?._id,
    };

    dispatch(addCart(values));
  };

  const modalHandler = () => {
    setVisible(false);
    router.push("login");
  };

  useEffect(() => {
    setTotalAmount(quantity * (product?.price || 0));
  }, [quantity, product?.price]);

  useEffect(() => {
    const getProduct = () => dispatch(showProduct(id));
    const getCartData = () => dispatch(showCart());
    getProduct();
    getCartData();
  }, []);

  return (
    <>
      <FlashMessage position='top' duration={3000} />
      <Modal
        message={"First login then add to cart your product"}
        modalVisible={visible}
        setModalVisible={setVisible}
        onPress={modalHandler}
        leftBtnText={"Cancel"}
        rightBtnText={"Login"}
        leftBtnColor={"red"}
        rightBtnColor={"blue"}
      />
      <ScrollView>
        <View style={styles.container}>
          <View style={[styles.imageContainer, { marginBottom: 10 }]}>
            {selectedImage !== "" ? (
              <Image
                source={{
                  uri: selectedImage,
                }}
                style={styles.image}
              />
            ) : selectedImages !== "" ? (
              <Image
                source={{
                  uri: selectedImages,
                }}
                style={styles.image}
              />
            ) : (
              <Image
                source={{
                  uri: product?.image,
                }}
                style={styles.image}
              />
            )}

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              justifyContent='center'
              alignItems='center'
              style={{
                display: product?.images?.length === 0 ? "none" : "flex",
                marginVertical: 10,
                backgroundColor: "white",
                borderRadius: 10,
                height: 300,
              }}
            >
              <TouchableOpacity onPress={imageHandler}>
                <Image
                  source={{
                    uri: product?.image,
                  }}
                  style={styles.images}
                />
              </TouchableOpacity>
              {product?.images?.map((image, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => imagesHandler(index)}
                >
                  <Image
                    source={{
                      uri: image,
                    }}
                    style={styles.images}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <View style={styles.contentContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{product?.name}</Text>
              {product.countInStock < 10 && product.countInStock > 0 ? (
                <Text style={styles.text("yellow")}>Low Stock</Text>
              ) : product.countInStock === 0 ? (
                <Text style={styles.text("red")}>Out of Stock</Text>
              ) : (
                <Text style={styles.text("lightgreen")}>In Stock</Text>
              )}
            </View>
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionTitle}>Description</Text>
              <Text style={styles.descriptionText}>{product?.description}</Text>
            </View>
            <View style={styles.colorSizeContainer}>
              <View
                style={[
                  styles.colorContainer,
                  { display: product?.colors?.length === 0 ? "none" : "flex" },
                ]}
              >
                <Text style={styles.colorTitle}>Choose Colors</Text>
                <View style={styles.colorOptionsContainer}>
                  {product?.colors?.map((color, index) => (
                    <TouchableOpacity
                      style={[
                        styles.colorButton,
                        {
                          backgroundColor: color,
                          borderColor:
                            color === selectedColor ? "black" : "transparent",
                        },
                      ]}
                      onPress={() => colorHandler(color)}
                      key={index}
                    >
                      <View style={styles.circle(color)} />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              <View
                style={[
                  styles.sizeContainer,
                  { display: product?.sizes?.length === 0 ? "none" : "flex" },
                ]}
              >
                <Text style={styles.sizeTitle}>Size</Text>
                <View style={styles.sizeOptionsContainer}>
                  {product?.sizes?.map((size, index) => (
                    <TouchableOpacity
                      style={[
                        styles.sizeButton,
                        {
                          backgroundColor:
                            size === selectedSize ? "gray" : "#eaeaea",
                        },
                      ]}
                      onPress={() => sizeHandler(size)}
                      key={index}
                    >
                      <Text
                        style={[
                          styles.sizeText,
                          { color: size === selectedSize ? "white" : "black" },
                        ]}
                      >
                        {size}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
            <View style={styles.quantityContainer}>
              <Text style={styles.quantityText}>Quantity</Text>
              <View style={styles.quantityInputContainer}>
                <TouchableOpacity
                  onPress={plusHandler}
                  disabled={quantity === product?.countInStock}
                >
                  <Image source={plus} style={{ height: 35, width: 35 }} />
                </TouchableOpacity>
                <Text style={styles.quantity}>{quantity}</Text>
                <TouchableOpacity
                  onPress={minusHandler}
                  disabled={quantity === 1}
                >
                  <Image source={minus} style={{ height: 35, width: 35 }} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.totalContainer}>
              <Text style={styles.totalText}>Total</Text>
              <Text style={styles.totalAmount}>Rs. {totalAmount}</Text>
              <TouchableOpacity
                style={styles.addToCartButton}
                onPress={cartHandler}
              >
                <Image source={cart} style={styles.cartImage} />
                <Text style={styles.addToCartText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    marginTop: 4,
    marginBottom: 4,
  },
  imageContainer: {
    width: "100%",
    height: 320,
    backgroundColor: "#eaeaea",
    paddingLeft: 48,
    paddingRight: 48,
  },
  image: {
    width: "70%",
    height: "70%",
    resizeMode: "contain",
    alignSelf: "center",
  },
  imagesContainer: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    height: 300,
    width: "100%",
    backgroundColor: "#FFFFFF",
  },
  images: {
    height: 80,
    width: 80,
    resizeMode: "cover",
    marginHorizontal: 10,
    borderRadius: 20,
  },
  contentContainer: {
    margin: 8,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    lineHeight: 28,
    color: "black",
  },
  text: (color) => ({
    color: color,
    fontWeight: "bold",
    fontSize: 20,
    backgroundColor: "black",
    width: 120,
    textAlign: "center",
    borderRadius: 40,
  }),
  descriptionContainer: {
    marginVertical: 4,
  },
  descriptionTitle: {
    fontWeight: "bold",
    fontSize: 16,
    lineHeight: 24,
    color: "black",
  },
  descriptionText: {
    fontWeight: "400",
    marginVertical: 4,
    lineHeight: 20,
  },
  colorButton: {
    width: 30,
    height: 30,
    borderRadius: 25,
    borderWidth: 4,
    marginHorizontal: 5,
  },
  colorSizeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 8,
  },
  colorContainer: {
    marginRight: 8,
  },
  colorTitle: {
    fontWeight: "bold",
    fontSize: 16,
    lineHeight: 24,
    marginVertical: 8,
    color: "black",
  },
  colorOptionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  circle: (color) => ({
    borderRadius: 50,
    borderWidth: 8,
    borderColor: color,
  }),
  sizeContainer: {
    marginLeft: 8,
  },
  sizeTitle: {
    fontWeight: "bold",
    fontSize: 16,
    lineHeight: 24,
    marginVertical: 8,
    color: "black",
  },
  sizeOptionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  sizeText: {
    fontSize: 15,
  },
  sizeButton: {
    width: 30,
    height: 30,
    borderRadius: 25,
    borderWidth: 2,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginVertical: 16,
    marginTop: 4,
    gap: 2,
  },
  quantityText: {
    fontWeight: "bold",
    fontSize: 20,
    lineHeight: 28,
    color: "black",
    marginRight: 10,
  },
  quantityInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eaeaea",
    paddingVertical: 4,
    paddingHorizontal: 36,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  quantity: {
    fontWeight: "bold",
    fontSize: 20,
    lineHeight: 28,
    marginHorizontal: 16,
  },
  totalContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
  },
  totalText: {
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 24,
    color: "black",
  },
  totalAmount: {
    fontWeight: "bold",
    fontSize: 24,
    lineHeight: 32,
    color: "black",
  },
  addToCartButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "lightblue",
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  cartImage: {
    height: 30,
    width: 30,
  },
  addToCartText: {
    marginLeft: 4,
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 16,
    marginRight: 16,
  },
});

export default Product;
