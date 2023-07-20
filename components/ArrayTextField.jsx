import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

const ArrayTextField = ({ setSizes, sizes }) => {
  const [text, setText] = useState("");

  const handleButtonPress = () => {
    if (text.trim() !== "") {
      setSizes([...sizes, text]);
      setText("");
    }
  };

  const handleBadgeRemove = (index) => {
    const updatedSizes = [...sizes];
    updatedSizes.splice(index, 1);
    setSizes(updatedSizes);
  };

  const renderBadge = (item, index) => {
    return (
      <View key={index} style={styles.badgeContainer}>
        <Text style={styles.badgeText}>{item}</Text>
        <TouchableOpacity
          style={styles.crossButton}
          onPress={() => handleBadgeRemove(index)}
        >
          <Text style={styles.crossText}>X</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          value={text}
          onChangeText={(text) => setText(text)}
          placeholder='Enter text'
        />
        <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.badgeContainer}>
        {sizes?.map((item, index) => renderBadge(item, index))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
  },
  textInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 13,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    padding: 10,
    width: "79.9%",
  },
  button: {
    marginLeft: 8,
    padding: 14,
    backgroundColor: "#007AFF",
    borderRadius: 4,
  },
  buttonText: {
    color: "#FFF",
  },
  badgeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  badgeText: {
    backgroundColor: "#007AFF",
    color: "#FFF",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
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

export default ArrayTextField;
