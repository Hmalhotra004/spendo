import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import Header from "@/components/Header";
import Input from "@/components/Input";
import ModalWrapper from "@/components/ModalWrapper";
import Typo from "@/components/Typo";
import WalletIcon from "@/components/WalletIcon";
import { COLORS, spacingY } from "@/constants/theme";
import useAuthStore from "@/store/useAuthStore";
import styles from "@/styles/profileModal.styles";
import { WalletType } from "@/types";
import api from "@/utils/api";
import { walletIcons } from "@/utils/walletIcons";
import { isAxiosError } from "axios";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, ScrollView, View } from "react-native";

const WalletModal = () => {
  const [loading, setloading] = useState(false);
  const [wallet, setWallet] = useState<WalletType>({
    icon: "",
    name: "",
  });

  const { user, token } = useAuthStore();
  const router = useRouter();

  async function onSubmit() {
    try {
      setloading(true);
      if (!wallet.name.trim() || !wallet.icon.trim()) {
        Alert.alert("User", "Please fill all fields");
        setloading(false);
        return;
      }

      const response = await api.post(
        `/wallet/${user?.id}`,
        {
          name: wallet.name,
          icon: wallet.icon,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        Alert.alert("Wallet", "Wallet Created!");
        setWallet({ name: "", icon: "" });
        setTimeout(() => {
          router.back();
        }, 2000);
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

          <View>
            <Typo
              color={COLORS.neutral200}
              style={{ marginBottom: 10 }}
            >
              Choose Icon
            </Typo>
            <View
              style={{
                flexWrap: "wrap",
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
              }}
            >
              {walletIcons.map((w, idx) => (
                <WalletIcon
                  key={idx.toString()}
                  IconComponent={w.icon}
                  iconName={w.icon.toString()}
                  setWallet={setWallet}
                  wallet={wallet}
                />
              ))}
            </View>
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
