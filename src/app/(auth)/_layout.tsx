import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";
import { useAuth } from "../contexts/AuthContexts";

export default function AuthLayout() {
  const { theme } = useAuth();
  const colors = Colors[theme];

  return (
    <Stack screenOptions={{ title: "EventFlow", headerShadowVisible: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ title: "Criar Conta" }} />
    </Stack>
  );
}
