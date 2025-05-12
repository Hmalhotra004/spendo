import { COLORS, radius, spacingX } from "@/constants/theme";
import { WalletType } from "@/types";
import { verticalScale } from "@/utils/styling";
import { Router } from "expo-router";
import { CaretRight, PiggyBank } from "phosphor-react-native";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import Typo from "./Typo";

interface WalletItemProps {
  wallet: WalletType;
  idx: number;
  router?: Router;
}

const WalletItem = ({ idx, router, wallet }: WalletItemProps) => {
  function openWallet() {
    router?.push({
      pathname: "/(modals)/walletModal",
      params: {
        id: wallet._id,
        name: wallet.name,
        icon: wallet.icon,
      },
    });
  }
  // const IconComponent = Icons[wallet.icon];
  return (
    <Animated.View
      entering={FadeInDown.delay(idx * 50)
        .springify()
        .damping(13)}
    >
      <TouchableOpacity
        style={styles.container}
        onPress={openWallet}
      >
        <View style={styles.iconContainer}>
          {/* TODO: fisme */}
          <PiggyBank />
        </View>
        <View style={styles.nameContainer}>
          <Typo size={16}>{wallet.name}</Typo>
          <Typo
            size={14}
            color={COLORS.neutral400}
          >
            {wallet.amount}
          </Typo>
        </View>
        <CaretRight
          size={verticalScale(20)}
          weight="bold"
          color={COLORS.white}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default WalletItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(17),
  },
  iconContainer: {
    height: verticalScale(17),
    width: verticalScale(45),
    borderWidth: 1,
    borderColor: COLORS.neutral600,
    borderRadius: radius._12,
    borderCurve: "continuous",
    overflow: "hidden",
  },
  nameContainer: {
    flex: 1,
    gap: 2,
    marginLeft: spacingX._10,
  },
});
