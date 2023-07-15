import React from "react";
import {
  Alert,
  Modal as M,
  StyleSheet,
  Text,
  Pressable,
  View,
} from "react-native";

const Modal = ({
  modalVisible,
  setModalVisible,
  message,
  onPress,
  leftBtnText,
  rightBtnText,
  leftBtnColor,
  rightBtnColor,
  displayLeftButton,
  displayRightButton
}) => {
  return (
    <View
      style={[styles.centeredView, { display: modalVisible ? "flex" : "none" }]}
    >
      <M
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{message}</Text>
            <View style={styles.btnContainer}>
              <Pressable
                style={[styles.button(leftBtnColor), { display: displayLeftButton }]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>{leftBtnText}</Text>
              </Pressable>
              <Pressable
                style={[styles.button(rightBtnColor), { display: displayRightButton }]}
                onPress={onPress}
              >
                <Text style={styles.textStyle}>{rightBtnText}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </M>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  btnContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    gap: 20,
  },
  button: (color) => ({
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    backgroundColor: color,
  }),
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default Modal;
