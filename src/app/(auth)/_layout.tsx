// src/app/(auth)/_layout.jsx
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ title: "EventFlow", headerShadowVisible: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ title: "Criar Conta" }} />
    </Stack>
  );
}
