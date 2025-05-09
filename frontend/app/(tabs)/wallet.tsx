import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { COLORS } from "@/constants/theme";
import styles from "@/styles/wallet.styles";
import { verticalScale } from "@/utils/styling";
import { useRouter } from "expo-router";
import { PlusCircle } from "phosphor-react-native";
import React from "react";
import { TouchableOpacity, View } from "react-native";

const Wallet = () => {
  const router = useRouter();
  function getTotalBalance() {
    return 599;
  }
  return (
    <ScreenWrapper style={{ backgroundColor: COLORS.black }}>
      <View style={styles.container}>
        <View style={styles.balanceView}>
          <View style={{ alignItems: "center" }}>
            <Typo
              size={45}
              fontWeight="500"
            >
              ${getTotalBalance().toFixed(2)}
            </Typo>
            <Typo
              size={16}
              color={COLORS.neutral300}
            >
              Total balance
            </Typo>
          </View>
        </View>

        <View style={styles.wallets}>
          <View style={styles.flexRow}>
            <Typo
              size={20}
              fontWeight="500"
            >
              My Wallets
            </Typo>
            <TouchableOpacity
              onPress={() => router.push("/(modals)/walletModal")}
            >
              <PlusCircle
                weight="fill"
                color={COLORS.primary}
                size={verticalScale(33)}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Wallet;
