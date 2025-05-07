import Button from "@/components/Button";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { COLORS } from "@/constants/theme";
import { styles } from "@/styles/welcome.styles";
import { useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";

const Welcome = () => {
  const router = useRouter();
  return (
    <ScreenWrapper>
      <View style={styles.contanier}>
        <View>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => router.push("/(auth)/login")}
          >
            <Typo fontWeight={"500"}>Sign in</Typo>
          </TouchableOpacity>
        </View>

        <Animated.Image
          entering={FadeIn.duration(1000)}
          source={require("@/assets/images/welcome.png")}
          style={styles.welcomeImage}
          resizeMode="contain"
        />

        <View style={styles.footer}>
          <Animated.View
            entering={FadeInDown.duration(1000).springify().damping(12)}
            style={{ alignItems: "center" }}
          >
            <Typo
              size={30}
              fontWeight={"800"}
            >
              Always take control
            </Typo>
            <Typo
              size={30}
              fontWeight={"800"}
            >
              of your finances
            </Typo>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.duration(1000)
              .delay(100)
              .springify()
              .damping(12)}
            style={{ alignItems: "center", gap: 2 }}
          >
            <Typo
              size={17}
              color={COLORS.textLight}
            >
              Finances must be arranged to set a better
            </Typo>
            <Typo
              size={17}
              color={COLORS.textLight}
            >
              lifestyle in future
            </Typo>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.duration(1000)
              .delay(200)
              .springify()
              .damping(12)}
            style={styles.btnContainer}
          >
            <Button onPress={() => router.push("/(auth)/register")}>
              <Typo
                color={COLORS.neutral900}
                size={22}
                fontWeight="600"
              >
                Get Started
              </Typo>
            </Button>
          </Animated.View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Welcome;
