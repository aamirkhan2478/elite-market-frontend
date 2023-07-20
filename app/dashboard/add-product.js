import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  ScrollView,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import SelectDropdown from "../../components/Select";
import ColorPicker from "../../components/ColorPicker";
import { useEffect, useState } from "react";
import CameraIcon from "../../components/CameraIcon";
import camera from "../../assets/icons/camera.png";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect, useRouter } from "expo-router";
import { addProduct } from "../../redux/Product/productSlice";
import LoadingButton from "../../components/LoadingButton";
import Modal from "../../components/Modal";
import ArrayTextField from "../../components/ArrayTextField";
import { showCategories } from "../../redux/Category/categorySlice";
import RadioButton from "../../components/RadioButton";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

const AddProduct = () => {
  const { productLoading } = useSelector((state) => state.product);
  const { categories } = useSelector((state) => state.category);
  const { user, token } = useSelector((state) => state.auth);
  const [values, setValues] = useState({
    name: "",
    description: "",
    image: "",
    countInStock: "",
    brand: "",
    category: "",
    price: "",
    isFeatured: false,
  });
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [visible, setVisible] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  //This function is used for pick a image from gallery
  const PickImage = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Toast.show({
          text1:"Permission Denied!",
          type:"error",
        })
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setValues({ ...values, image: result.assets[0].uri });
    }
  };

  const buttonHandler = () => {
    const data = {
      ...values,
      colors,
    };
    dispatch(addProduct(data, router));
    setValues({
      name: "",
      description: "",
      image: "",
      countInStock: "",
      brand: "",
      category: "Select an option",
      price: "",
      isFeatured: false,
    });
    setColors([]);
    setSizes([]);
  };

  setTimeout(() => {
    setRefresh(true);
  }, 1000);

  const handleBadgeRemove = (index) => {
    const updatedColors = [...colors];
    updatedColors.splice(index, 1);
    setColors(updatedColors);
  };

  useEffect(() => {
    const getCategories = () => dispatch(showCategories());
    getCategories();
  }, [refresh]);
  useFocusEffect(() => {
    if (!token || user?.isAdmin === false) {
      router.push("home");
    }
  });

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
      <Modal
        element={
          <ColorPicker
            setColors={setColors}
            colorsArray={colors}
            setVisible={setVisible}
          />
        }
        setModalVisible={setVisible}
        modalVisible={visible}
        displayRightButton={"none"}
        leftBtnText={"Close"}
        leftBtnColor={"red"}
      />
      <ScrollView style={{ paddingVertical: 20 }}>
        <Text style={styles.heading}>Add Product</Text>
        <View style={styles.imageContainer}>
          <View style={styles.image}>
            {values.image && (
              <Image source={{ uri: values.image }} style={styles.showImage} />
            )}
            <CameraIcon src={camera} onPress={PickImage} />
          </View>
        </View>
        <View style={styles.container}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder='Product Name'
            onChangeText={(text) => setValues({ ...values, name: text })}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            placeholder='Product Description'
            onChangeText={(text) => setValues({ ...values, description: text })}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.label}>Stock</Text>
          <TextInput
            style={styles.input}
            placeholder='Product Stock'
            onChangeText={(text) =>
              setValues({ ...values, countInStock: text })
            }
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.label}>Brand</Text>
          <TextInput
            style={styles.input}
            placeholder='Product Brand'
            onChangeText={(text) => setValues({ ...values, brand: text })}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.label}>Category</Text>
          <SelectDropdown
            options={categories}
            setValues={setValues}
            values={values}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.label}>Price</Text>
          <TextInput
            style={styles.input}
            placeholder='Product Price'
            onChangeText={(text) => setValues({ ...values, price: text })}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.label}>Featured Product</Text>
          <RadioButton setValues={setValues} values={values} />
        </View>
        <View style={styles.container}>
          <Text style={styles.label}>Sizes</Text>
          <ArrayTextField setSizes={setSizes} sizes={sizes} />
        </View>
        <View style={styles.container}>
          <Button title='Select Colors' onPress={() => setVisible(true)} />
        </View>
        <View style={styles.colorContainer}>
          {colors?.map((color, index) => (
            <>
              <TouchableOpacity
                style={styles.crossButton}
                onPress={() => handleBadgeRemove(index)}
              >
                <Text style={styles.crossText}>X</Text>
              </TouchableOpacity>
              <View key={index} style={styles.circle(color)} />
            </>
          ))}
        </View>
        <View style={styles.buttonContainer}>
          <LoadingButton
            btnStyles={styles.button}
            indicatorColor={"white"}
            isLoading={productLoading}
            onPress={buttonHandler}
            textStyles={styles.buttonText}
          >
            Add Product
          </LoadingButton>
        </View>
      </ScrollView>
      <Toast config={createConfig} />
    </SafeAreaView>
  );
};

export default AddProduct;
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
  showImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  buttonContainer: {
    width: "80%",
    height: 100,
    marginHorizontal: "10%",
    paddingVertical: 10,
  },
  colorContainer: {
    width: 400,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
    flexWrap: "wrap",
  },
  circle: (color) => ({
    borderRadius: 50,
    borderWidth: 19,
    borderColor: color,
    justifyContent: "center",
    alignItems: "center",
  }),
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    opacity: 1,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  crossButton: {
    backgroundColor: "#FF0000",
    width: 20,
    height: 20,
    borderRadius: 10,
    marginLeft: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  crossText: {
    color: "#FFF",
    fontSize: 12,
  },
});
