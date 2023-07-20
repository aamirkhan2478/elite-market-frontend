import React from "react";
import { View, StyleSheet } from "react-native";

import { Picker } from "@react-native-picker/picker";

const SelectDropdown = ({ options, setValues, values }) => {
  const handleOptionSelect = (option) => {
    setValues({ ...values, category: option });
  };

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={values.category}
        style={styles.dropdown}
        onValueChange={(itemValue) => handleOptionSelect(itemValue)}
      >
        <Picker.Item label='Select an option' value='' />
        {options?.map((option) => (
          <Picker.Item
            key={option._id}
            label={option.name}
            value={option._id}
          />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 5,
  },
  dropdown: {
    width: "100%",
    borderWidth: 1,
    borderColor: "black",
  },
});

export default SelectDropdown;
