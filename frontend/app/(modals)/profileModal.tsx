import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import Header from "@/components/Header";
import Input from "@/components/Input";
import ModalWrapper from "@/components/ModalWrapper";
import Typo from "@/components/Typo";
import { COLORS, spacingY } from "@/constants/theme";
import useAuthStore from "@/store/useAuthStore";
import styles from "@/styles/profileModal.styles";
import api from "@/utils/api";
import { isAxiosError } from "axios";
import { Image } from "expo-image";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, View } from "react-native";

const ProfileModal = () => {
  const { user, setUser, token } = useAuthStore();
  const [name, setName] = useState("");
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setName(user?.username!);
  }, [setName, user?.username]);

  async function onSubmit() {
    try {
      setloading(true);
      if (!name.trim()) {
        Alert.alert("User", "Please filll all fields");
        return;
      }

      const response = await api.patch(
        `/users/${user?.id}`,
        {
          username: name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setUser(response.data.user);
        Alert.alert("User", "Name Updated Successfully");
      }
    } catch (error) {
      if (isAxiosError(error)) {
        Alert.alert("Error", error.response?.data.message);
      }
    } finally {
      setloading(false);
    }
  }

  return (
    <ModalWrapper>
      <View style={styles.container}>
        <Header
          title="Update Profile"
          leftIcon={<BackButton />}
          style={{ marginBottom: spacingY._10 }}
        />

        <ScrollView contentContainerStyle={styles.form}>
          <View style={styles.avatarContainer}>
            <Image
              style={styles.avatar}
              source={require("../../assets/images/defaultAvatar.png")}
              contentFit="cover"
              transition={100}
            />
          </View>

          <View style={styles.inputContainer}>
            <Typo color={COLORS.neutral200}>Name</Typo>
            <Input
              placeholder="name"
              value={name}
              onChangeText={(value) => setName(value)}
            />
          </View>
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <Button
          onPress={onSubmit}
          style={{ flex: 1 }}
          loading={loading}
        >
          <Typo
            color={COLORS.black}
            fontWeight="700"
          >
            Update
          </Typo>
        </Button>
      </View>
    </ModalWrapper>
  );
};

export default ProfileModal;
