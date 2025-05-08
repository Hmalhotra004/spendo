import ScreenWrapper from "@/components/ScreenWrapper";
import { COLORS } from "@/constants/theme";
import { Image, StyleSheet, View } from "react-native";

export default function Index() {
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Image
          style={styles.logo}
          resizeMode="contain"
          source={require("@/assets/images/splashImage.png")}
        />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.neutral900,
  },
  logo: {
    height: "20%",
    aspectRatio: 1,
  },
});
