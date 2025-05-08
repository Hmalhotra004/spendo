import Button from "@/components/Button";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import useAuthStore from "@/store/useAuthStore";
import React from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

const Profile = () => {
  const { logout } = useAuthStore();
  function confirmLogout() {
    Alert.alert("Logout", "Are you sure you want to logout", [
      { text: "Cancel", style: "cancel" },
      { text: "logout", onPress: () => logout(), style: "destructive" },
    ]);
  }

  return (
    <ScreenWrapper>
      <Text>profile</Text>
      <Button onPress={confirmLogout}>
        <Typo>Logout</Typo>
      </Button>
    </ScreenWrapper>
  );
};

export default Profile;

const styles = StyleSheet.create({});
