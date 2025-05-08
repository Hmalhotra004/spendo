import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import Input from "@/components/Input";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { COLORS, spacingY } from "@/constants/theme";
import useAuthStore from "@/store/useAuthStore";
import styles from "@/styles/login.styles";
import { verticalScale } from "@/utils/styling";
import { useRouter } from "expo-router";
import { At, Lock, User } from "phosphor-react-native";
import React, { useRef } from "react";
import { Alert, Pressable, View } from "react-native";

const Register = () => {
  const nameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const router = useRouter();
  const { register, isLoading } = useAuthStore();

  async function handleSubmit() {
    if (!emailRef.current || !passwordRef.current || !nameRef.current) {
      Alert.alert("Sign up", "Please fill all the fields");
      return;
    }

    const username = nameRef.current;
    const email = emailRef.current;
    const password = passwordRef.current;

    const result = await register(username, email, password);
    if (result.success) {
      Alert.alert("Sign Up", "Registration Successfull");
      setTimeout(() => {
        router.replace("/(auth)/login");
      }, 2000);
    }
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
            Let&apos;s
          </Typo>
          <Typo
            size={30}
            fontWeight="800"
          >
            Get Started
          </Typo>
        </View>

        <View style={styles.form}>
          <Typo
            size={16}
            color={COLORS.textLighter}
          >
            Create an account to track your expenses
          </Typo>

          <Input
            placeholder="Enter your Name"
            onChangeText={(value) => (nameRef.current = value)}
            icon={
              <User
                size={verticalScale(26)}
                color={COLORS.neutral300}
                weight="light"
              />
            }
          />
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

          <Button
            onPress={handleSubmit}
            loading={isLoading}
          >
            <Typo
              fontWeight="700"
              color={COLORS.black}
              size={21}
            >
              Sign Up
            </Typo>
          </Button>
        </View>

        <View style={styles.footer}>
          <Typo size={15}>Already have an account?</Typo>
          <Pressable onPress={() => router.replace("/(auth)/login")}>
            <Typo
              size={15}
              fontWeight="700"
              color={COLORS.primary}
            >
              Log In
            </Typo>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Register;
