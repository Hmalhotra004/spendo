import { COLORS, radius, spacingX } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import React, { ReactNode, RefObject } from "react";
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

export interface InputProps extends TextInputProps {
  icon?: ReactNode;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  inputRef?: RefObject<TextInput>;
}

const Input = ({
  icon,
  containerStyle,
  inputStyle,
  inputRef,
  ...props
}: InputProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {icon && icon}
      <TextInput
        style={[styles.input, inputStyle]}
        placeholderTextColor={COLORS.neutral400}
        ref={inputRef && inputRef}
        {...props}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: verticalScale(54),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.neutral300,
    borderRadius: radius._17,
    borderCurve: "continuous",
    paddingHorizontal: spacingX._15,
    gap: spacingX._10,
  },
  input: {
    flex: 1,
    color: COLORS.white,
    fontSize: verticalScale(14),
  },
});
