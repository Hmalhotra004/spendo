import { COLORS } from "@/constants/theme";
import { WalletType } from "@/types";
import { IconProps } from "phosphor-react-native";
import React, { Dispatch, SetStateAction } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

interface WalletIconProps {
  wallet: WalletType;
  setWallet: Dispatch<SetStateAction<WalletType>>;
  iconName: string;
  IconComponent: React.ComponentType<IconProps>;
}

const WalletIcon = ({
  wallet,
  setWallet,
  iconName,
  IconComponent,
}: WalletIconProps) => {
  const isSelected = wallet.icon === iconName;

  return (
    <TouchableOpacity
      onPress={() => setWallet({ ...wallet, icon: iconName })}
      style={[
        styles.iconWrapper,
        { backgroundColor: isSelected ? COLORS.neutral700 : "transparent" },
      ]}
    >
      <IconComponent
        color={COLORS.white}
        size={32}
      />
    </TouchableOpacity>
  );
};

export default WalletIcon;

const styles = StyleSheet.create({
  iconWrapper: {
    padding: 8,
    borderRadius: 8,
  },
});
