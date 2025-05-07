import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import Input from "@/components/Input";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { COLORS, spacingY } from "@/constants/theme";
import styles from "@/styles/login.styles";
import { verticalScale } from "@/utils/styling";
import { useRouter } from "expo-router";
import { At, Lock } from "phosphor-react-native";
import React, { useRef, useState } from "react";
import { Alert, Pressable, View } from "react-native";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const router = useRouter();

  function handleSubmit() {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert("Login", "Please fill all the fields");
      return;
    }
    console.log(emailRef.current);
    console.log(passwordRef.current);
  }

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <BackButton iconSize={28} />

        <View style={{ gap: 5, marginTop: spacingY._20 }}>
          <Typo
            size={30}
            fontWeight="800"
          >
            Hey,
          </Typo>
          <Typo
            size={30}
            fontWeight="800"
          >
            Welcome Back
          </Typo>
        </View>

        <View style={styles.form}>
          <Typo
            size={16}
            color={COLORS.textLighter}
          >
            Login now to track your expenses
          </Typo>

          <Input
            placeholder="Enter your Email"
            onChangeText={(value) => (emailRef.current = value)}
            icon={
              <At
                size={verticalScale(26)}
                color={COLORS.neutral300}
                weight="light"
              />
            }
          />
          <Input
            placeholder="Enter your Password"
            secureTextEntry
            onChangeText={(value) => (passwordRef.current = value)}
            icon={
              <Lock
                size={verticalScale(26)}
                color={COLORS.neutral300}
                weight="regular"
              />
            }
          />

          <Typo
            size={14}
            color={COLORS.text}
            style={{ alignSelf: "flex-end" }}
          >
            Forgot password?
          </Typo>

          <Button
            onPress={handleSubmit}
            loading={isLoading}
          >
            <Typo
              fontWeight="700"
              color={COLORS.black}
              size={21}
            >
              Login
            </Typo>
          </Button>
        </View>

        <View style={styles.footer}>
          <Typo size={15}>Don&apos;t have an account?</Typo>
          <Pressable onPress={() => router.replace("/(auth)/register")}>
            <Typo
              size={15}
              fontWeight="700"
              color={COLORS.primary}
            >
              Sign up
            </Typo>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Login;
