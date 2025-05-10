import Loading from "@/components/Loading";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import WalletItem from "@/components/WalletItem";
import { COLORS } from "@/constants/theme";
import useAuthStore from "@/store/useAuthStore";
import styles from "@/styles/wallet.styles";
import { WalletType } from "@/types";
import api from "@/utils/api";
import { verticalScale } from "@/utils/styling";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { PlusCircle } from "phosphor-react-native";
import React from "react";
import { FlatList, TouchableOpacity, View } from "react-native";

const Wallet = () => {
  const { user, token } = useAuthStore();
  const {
    data: wallets,
    isLoading,
    isError,
  } = useQuery<WalletType[]>({
    queryKey: ["wallets"],
    queryFn: async () => {
      const response = await api.get(`/wallets/${user?.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
  });

  const router = useRouter();
  const getTotalBalance = () =>
    wallets?.reduce((total, item) => {
      total = total + (item.amount || 0);
      return total;
    }, 0);

  return (
    <ScreenWrapper style={{ backgroundColor: COLORS.black }}>
      <View style={styles.container}>
        <View style={styles.balanceView}>
          <View style={{ alignItems: "center" }}>
            <Typo
              size={45}
              fontWeight="500"
            >
              ${getTotalBalance()?.toFixed(2)}
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

          {isLoading && <Loading />}
          {isError && (
            <View>
              <Typo>Error</Typo>
            </View>
          )}

          <FlatList
            data={wallets}
            contentContainerStyle={styles.listStyle}
            ListEmptyComponent={
              <View style={{ flex: 1, alignItems: "center", marginTop: 4 }}>
                <Typo size={20}>No Wallets Found</Typo>
                <Typo
                  size={16}
                  color={COLORS.neutral400}
                >
                  Try adding some
                </Typo>
              </View>
            }
            renderItem={({ item, index }) => (
              <WalletItem
                idx={index}
                wallet={item}
                // router={""}
              />
            )}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Wallet;
