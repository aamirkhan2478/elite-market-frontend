import React from "react";
import { Text, TouchableOpacity, ActivityIndicator, Image } from "react-native";

const LoadingButton = ({
  isLoading,
  btnStyles,
  indicatorColor,
  textStyles,
  onPress,
  children,
  disabled,
  imageSrc,
  imageStyle,
}) => {
  return (
    <TouchableOpacity
      style={btnStyles}
      onPress={onPress}
      disabled={isLoading || disabled}
    >
      {isLoading ? (
        <ActivityIndicator color={indicatorColor} />
      ) : (
        <>
          <Image source={imageSrc} style={imageStyle} />
          <Text style={textStyles}>{children}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export default LoadingButton;
