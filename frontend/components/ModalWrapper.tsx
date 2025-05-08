import { COLORS, spacingY } from "@/constants/theme";
import React from "react";
import { Platform, StyleSheet, View, ViewStyle } from "react-native";

export type ModalWrapperProps = {
  style?: ViewStyle;
  children: React.ReactNode;
  bg?: string;
};

const ModalWrapper = ({
  children,
  style,
  bg = COLORS.neutral800,
}: ModalWrapperProps) => {
  let paddingTop = Platform.OS === "ios" ? spacingY._15 : 50;

  return (
    <View
      style={[
        styles.container,
        { paddingTop, backgroundColor: bg },
        style && style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: Platform.OS === "ios" ? spacingY._20 : spacingY._10,
  },
});

export default ModalWrapper;
