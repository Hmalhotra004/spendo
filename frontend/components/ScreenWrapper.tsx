import { COLORS } from "@/constants/theme";
import React from "react";
import { Dimensions, Platform, StatusBar, View, ViewStyle } from "react-native";

export type ScreenWrapperProps = {
  style?: ViewStyle;
  children: React.ReactNode;
};

const ScreenWrapper = ({ children, style }: ScreenWrapperProps) => {
  const { height } = Dimensions.get("window");
  let paddingTop = Platform.OS === "ios" ? height * 0.06 : 50;

  return (
    <View
      style={[
        { paddingTop, flex: 1, backgroundColor: COLORS.neutral900 },
        style,
      ]}
    >
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={COLORS.neutral900}
      />
      {children}
    </View>
  );
};

export default ScreenWrapper;
