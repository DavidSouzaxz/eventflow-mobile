import { Ionicons } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import { Alert } from "react-native";
import { useAuth } from "../contexts/AuthContexts";

export default function TabLayout() {
  const { signOut, user } = useAuth();
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#032ad7",
        headerShown: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Eventos",
          tabBarIcon: ({ color }) => (
            <Ionicons name="calendar" size={24} color={color} />
          ),
        }}
      />

      {user?.role === "ADMIN" ? (
        <Tabs.Screen
          name="scanner"
          options={{
            title: "Ler QR Code",
            tabBarIcon: ({ color }) => (
              <Ionicons name="qr-code-outline" size={24} color={color} />
            ),
          }}
        />
      ) : (
        <Tabs.Screen
          name="scanner"
          options={{
            href: null,
          }}
        />
      )}

      <Tabs.Screen
        name="logout"
        options={{
          title: "Sair",
          tabBarIcon: ({ color }) => (
            <Ionicons name="exit-outline" size={24} color={color} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            Alert.alert("Sair", "Deseja realmente sair da conta?", [
              { text: "Cancelar", style: "cancel" },
              {
                text: "Sair",
                style: "destructive",
                onPress: async () => {
                  await signOut();
                  router.replace("/(auth)");
                },
              },
            ]);
          },
        }}
      />
    </Tabs>
  );
}
