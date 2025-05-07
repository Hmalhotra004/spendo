import React from "react";
import { ActivityIndicator, ActivityIndicatorProps, View } from "react-native";

const Loading = ({ size = "large", color }: ActivityIndicatorProps) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignContent: "center" }}>
      <ActivityIndicator
        size={size}
        color={color}
      />
    </View>
  );
};

export default Loading;
