import { COLORS, radius } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import { useRouter } from "expo-router";
import { CaretLeft } from "phosphor-react-native";
import React from "react";
import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";

export type BackButtonProps = {
  style?: ViewStyle;
  iconSize?: number;
};

const BackButton = ({ iconSize = 26, style }: BackButtonProps) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.back()}
      style={[styles.btn, style]}
    >
      <CaretLeft
        size={verticalScale(iconSize)}
        color={COLORS.white}
        weight="bold"
      />
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: COLORS.neutral600,
    alignSelf: "flex-start",
    borderRadius: radius._12,
    borderCurve: "continuous",
    padding: 5,
  },
});
