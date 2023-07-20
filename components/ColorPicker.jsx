import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
const colors = [
  "#FF0000", // Red
  "#FFA500", // Orange
  "#FFFF00", // Yellow
  "#00FF00", // Green
  "#0000FF", // Blue
  "#800080", // Purple
  "#FFC0CB", // Pink
  "#FFFFFF", // White
  "#000000", // Black
  "#FFD700", // Gold
  "#00FFFF", // Cyan
  "#FF1493", // Deep Pink
];
const ColorPickerScreen = ({ setColors, colorsArray }) => {
  const renderColorPickerItem = (color) => {
    return (
      <TouchableOpacity
        key={color}
        style={[styles.colorPickerItem, { backgroundColor: color }]}
        onPress={() => handleColorSelection(color)}
      />
    );
  };

  const handleColorSelection = (color) => {
    if (!colorsArray.includes(color)) {
      setColors([...colorsArray, color]);
    }
  };
  return (
    <>
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>Choose Colors</Text>
      <View style={styles.container}>
        {colors.map((color) => renderColorPickerItem(color))}
      </View>
    </>
  );
};

export default ColorPickerScreen;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  colorPickerItem: {
    width: 64,
    height: 64,
    borderRadius: 32,
    margin: 8,
  },
});
