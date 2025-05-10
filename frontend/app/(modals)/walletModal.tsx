import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import Header from "@/components/Header";
import Input from "@/components/Input";
import ModalWrapper from "@/components/ModalWrapper";
import Typo from "@/components/Typo";
import { COLORS, spacingY } from "@/constants/theme";
import useAuthStore from "@/store/useAuthStore";
import styles from "@/styles/profileModal.styles";
import { WalletType } from "@/types";
import api from "@/utils/api";
import { isAxiosError } from "axios";
import { PiggyBank } from "phosphor-react-native";
import React, { useState } from "react";
import { Alert, ScrollView, View } from "react-native";

const WalletModal = () => {
  const { user, token } = useAuthStore();
  const [wallet, setWallet] = useState<WalletType>({
    icon: "",
    name: "",
  });
  const [loading, setloading] = useState(false);

  async function onSubmit() {
    try {
      setloading(true);
      if (!wallet.name.trim() || !wallet.icon.trim()) {
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
        // setUser(response.data.user);
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
          title="New Wallet"
          leftIcon={<BackButton />}
          style={{ marginBottom: spacingY._10 }}
        />

        <ScrollView contentContainerStyle={styles.form}>
          <View style={styles.inputContainer}>
            <Typo color={COLORS.neutral200}>Wallet Name</Typo>
            <Input
              placeholder="name"
              value={wallet.name}
              onChangeText={(value) => setWallet({ ...wallet, name: value })}
            />
          </View>
          <View style={{ flex: 1 }}>
            <PiggyBank
              color={COLORS.white}
              size={32}
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
            Add Wallet
          </Typo>
        </Button>
      </View>
    </ModalWrapper>
  );
};

export default WalletModal;
