import { COLORS, spacingX, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacingY._30,
    paddingHorizontal: spacingX._20,
  },
  welcomeText: {
    fontSize: verticalScale(20),
    color: COLORS.text,
    fontWeight: "bold",
  },
  form: {
    gap: spacingY._20,
  },
  forgotPass: {
    textAlign: "right",
    fontWeight: "500",
    color: COLORS.text,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  footerText: {
    textAlign: "center",
    color: COLORS.text,
    fontSize: verticalScale(15),
  },
});

export default styles;
