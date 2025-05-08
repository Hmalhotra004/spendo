import useAuthStore from "@/store/useAuthStore";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { InteractionManager } from "react-native";

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const { checkAuth, user, token } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    const task = InteractionManager.runAfterInteractions(() => {
      if (!router) return;

      const inAuthScreen = segments[0] === "(auth)";
      const isLoggedIn = user && token;

      if (!isLoggedIn && !inAuthScreen) {
        router.replace("/(auth)");
      } else if (isLoggedIn && inAuthScreen) {
        router.replace("/(tabs)");
      }
    });

    return () => task.cancel();
  }, [user, token, segments, router]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(auth)" />
    </Stack>
  );
}
