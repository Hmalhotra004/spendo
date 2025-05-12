import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import Header from "@/components/Header";
import Input from "@/components/Input";
import ModalWrapper from "@/components/ModalWrapper";
import Typo from "@/components/Typo";
import WalletIcon from "@/components/WalletIcon";
import { COLORS, spacingX, spacingY } from "@/constants/theme";
import useAuthStore from "@/store/useAuthStore";
import { useWalletStore } from "@/store/useWalletStore";
import styles from "@/styles/profileModal.styles";
import { WalletType } from "@/types";
import api from "@/utils/api";
import { verticalScale } from "@/utils/styling";
import { walletIcons } from "@/utils/walletIcons";
import { isAxiosError } from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Trash } from "phosphor-react-native";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, View } from "react-native";

const WalletModal = () => {
  const [loading, setloading] = useState(false);
  const [wallet, setWallet] = useState<WalletType>({
    icon: "",
    name: "",
  });

  const { user, token } = useAuthStore();
  const updateWallet = useWalletStore((s) => s.updateWallet);
  const addWallet = useWalletStore((s) => s.addWallet);
  const deleteWallet = useWalletStore((s) => s.deleteWallet);
  const router = useRouter();

  const oldWallet: { name: string; icon: any; id: string } =
    useLocalSearchParams();

  async function onSubmit() {
    try {
      setloading(true);
      if (!wallet.name.trim() || !wallet.icon.trim()) {
        Alert.alert("User", "Please fill all fields");
        setloading(false);
        return;
      }

      if (oldWallet.id) {
        const response = await api.patch(
          `/wallet/${user?.id}`,
          {
            name: wallet.name,
            icon: wallet.icon,
            id: oldWallet.id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          Alert.alert("Wallet", "Wallet Updated!");
          updateWallet(oldWallet.id, { name: wallet.name, icon: wallet.icon });
          setTimeout(() => {
            router.back();
          }, 2000);
        }
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
        addWallet(response.data);
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

  async function onDelete() {
    try {
      setloading(true);
      const response = await api.delete(`/wallet/${user?.id}`, {
        data: {
          id: oldWallet.id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        Alert.alert("Wallet", "Wallet Deleted!");
        deleteWallet(oldWallet.id);
        router.back();
      }
    } catch (error) {
      if (isAxiosError(error)) {
        Alert.alert("Error", error.response?.data.message);
      }
    } finally {
      setloading(false);
    }
  }

  function showDelete() {
    Alert.alert(
      "Confirm",
      "Are you sure you want to do this? \nThis action will remove all the transactions related to this wallet",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => onDelete(),
          style: "destructive",
        },
      ]
    );
  }

  useEffect(() => {
    if (oldWallet.id) {
      setWallet({ name: oldWallet.name, icon: oldWallet.icon });
    }
  }, []);

  return (
    <ModalWrapper>
      <View style={styles.container}>
        <Header
          title={oldWallet.id ? "Update Wallet" : "New Wallet"}
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
        {oldWallet.id && !loading && (
          <Button
            onPress={showDelete}
            style={{
              backgroundColor: COLORS.rose,
              paddingHorizontal: spacingX._15,
            }}
          >
            <Trash
              color={COLORS.white}
              size={verticalScale(24)}
              weight="bold"
            />
          </Button>
        )}
        <Button
          onPress={onSubmit}
          style={{ flex: 1 }}
          loading={loading}
        >
          <Typo
            color={COLORS.black}
            fontWeight="700"
          >
            {oldWallet.id ? "Update Wallet" : "Add Wallet"}
          </Typo>
        </Button>
      </View>
    </ModalWrapper>
  );
};

export default WalletModal;
