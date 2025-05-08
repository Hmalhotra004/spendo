import Header from "@/components/Header";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { COLORS, spacingY } from "@/constants/theme";
import useAuthStore from "@/store/useAuthStore";
import styles from "@/styles/profile.styles";
import accountOptions from "@/utils/accountOption";
import { verticalScale } from "@/utils/styling";
import { Image } from "expo-image";
import { CaretRight } from "phosphor-react-native";

import React from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

const Profile = () => {
  const { logout, user } = useAuthStore();
  function confirmLogout() {
    Alert.alert("Logout", "Are you sure you want to logout", [
      { text: "Cancel", style: "cancel" },
      { text: "logout", onPress: () => logout(), style: "destructive" },
    ]);
  }

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Header
          title="Profile"
          style={{ marginVertical: spacingY._10 }}
        />

        <View style={styles.userInfo}>
          <View>
            <Image
              source={require("../../assets/images/defaultAvatar.png")}
              style={styles.avatar}
              contentFit="cover"
              transition={100}
            />
          </View>
          <View style={styles.nameContainer}>
            <Typo
              size={24}
              fontWeight="600"
              color={COLORS.neutral100}
            >
              {user?.username}
            </Typo>
            <Typo
              size={15}
              color={COLORS.neutral400}
            >
              {user?.email}
            </Typo>
          </View>
        </View>

        <View style={styles.accountOptions}>
          {accountOptions.map((item, idx) => {
            return (
              <Animated.View
                entering={FadeInDown.delay(idx * 50)
                  .springify()
                  .damping(14)}
                key={idx.toString()}
                style={styles.listItem}
              >
                <TouchableOpacity style={styles.flexRow}>
                  <View
                    style={[styles.listIcon, { backgroundColor: item.bgColor }]}
                  >
                    {item.icon}
                  </View>
                  <Typo
                    size={16}
                    style={{ flex: 1 }}
                    fontWeight="500"
                  >
                    {item.title}
                  </Typo>
                  <CaretRight
                    size={verticalScale(20)}
                    weight="bold"
                    color={COLORS.white}
                  />
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Profile;
