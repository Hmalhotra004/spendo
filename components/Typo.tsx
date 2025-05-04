import { COLORS } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import React from "react";
import { Text, TextProps, TextStyle } from "react-native";

export type TypoProps = {
  size?: number;
  color?: string;
  fontWeight?: TextStyle["fontWeight"];
  children: any | null;
  style?: TextStyle;
  textProps?: TextProps;
};

const Typo = ({
  children,
  color = COLORS.text,
  fontWeight = 400,
  size,
  style,
  textProps,
}: TypoProps) => {
  const textStyle: TextStyle = {
    fontSize: size ? verticalScale(size) : verticalScale(18),
    color,
    fontWeight,
  };
  return (
    <Text
      style={[textStyle, style]}
      {...textProps}
    >
      {children}
    </Text>
  );
};

export default Typo;
