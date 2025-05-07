import { COLORS, spacingX, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  contanier: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: spacingY._7,
  },
  welcomeImage: {
    width: "100%",
    height: verticalScale(300),
    alignItems: "center",
    alignSelf: "stretch",
    marginTop: verticalScale(100),
  },
  loginBtn: {
    alignSelf: "flex-end",
    marginRight: spacingX._20,
  },
  footer: {
    backgroundColor: COLORS.neutral900,
    alignItems: "center",
    paddingTop: verticalScale(30),
    paddingBottom: verticalScale(45),
    gap: spacingY._20,
    shadowColor: COLORS.white,
    shadowOffset: { width: 0, height: -10 },
    elevation: 10,
    shadowRadius: 25,
    shadowOpacity: 0.15,
  },
  btnContainer: {
    width: "100%",
    paddingHorizontal: spacingX._25,
  },
});
