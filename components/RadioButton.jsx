import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

const RadioButton = ({ setValues, values }) => {
  const [selectedOption, setSelectedOption] = useState("option1");

  const handlePress = (option) => {
    setSelectedOption(option);
    if (option === "option1") {
      setValues({ ...values, isFeatured: true });
    } else {
      setValues({ ...values, isFeatured: false });
    }
  };

  return (
    <View style={{ flexDirection: "row", gap: 8, marginTop: 8 }}>
      <TouchableOpacity onPress={() => handlePress("option1")}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              borderWidth: 2,
              borderColor: selectedOption === "option1" ? "#007AFF" : "#000",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {selectedOption === "option1" && (
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: "#007AFF",
                }}
              />
            )}
          </View>
          <Text style={{ marginLeft: 10 }}>Yes</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handlePress("option2")}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              borderWidth: 2,
              borderColor: selectedOption === "option2" ? "#007AFF" : "#000",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {selectedOption === "option2" && (
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: "#007AFF",
                }}
              />
            )}
          </View>
          <Text style={{ marginLeft: 10 }}>No</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default RadioButton;
