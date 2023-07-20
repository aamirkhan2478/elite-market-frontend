import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import LoadingButton from "../../../components/LoadingButton";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect, useRouter, useSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import CameraIcon from "../../../components/CameraIcon";
import camera from "../../../assets/icons/camera.png";
import * as ImagePicker from "expo-image-picker";
import {
  showCategory,
  updateCategory,
} from "../../../redux/Category/categorySlice";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";


const AddCategory = () => {
  const { cateLoading, category } = useSelector((state) => state.category);
  const { user, token } = useSelector((state) => state.auth);
  const [values, setValues] = useState({
    name: "",
    image: "",
  });
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = useSearchParams();

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

  useEffect(() => {
    dispatch(showCategory(id));
    setValues({ name: category?.name, image: category?.image });
  }, []);

  useFocusEffect(() => {
    if (!token || user?.isAdmin === false) {
      router.push("home");
    } 
  });
  const buttonHandler = () => dispatch(updateCategory(values, id, router));

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
        <Text style={styles.heading}>Add Category</Text>
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
            placeholder='Category Name'
            onChangeText={(text) => setValues({ ...values, name: text })}
            defaultValue={values.name}
          />
        </View>
        <View style={styles.buttonContainer}>
          <LoadingButton
            btnStyles={styles.button}
            textStyles={styles.buttonText}
            indicatorColor={"white"}
            isLoading={cateLoading}
            onPress={buttonHandler}
          >
            Update Category
          </LoadingButton>
        </View>
      </ScrollView>
      <Toast config={createConfig}/>
    </SafeAreaView>
  );
};

export default AddCategory;
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
});
