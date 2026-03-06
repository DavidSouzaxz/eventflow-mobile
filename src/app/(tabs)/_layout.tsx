import { Colors } from "@/constants/Colors"; // Importe suas cores
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useAuth } from "../contexts/AuthContexts";

export default function TabLayout() {
  const { user, theme } = useAuth(); // Pegando o tema global
  const colors = Colors[theme];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: theme === "dark" ? "#64748B" : "#94A3B8",
        headerShown: true,
        // Estilo da Tab Bar (Rodapé)
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
        },
        // Estilo do Header (Topo)
        headerStyle: {
          backgroundColor: colors.card,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: "bold",
        },
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
        name="settings"
        options={{
          title: "Configurações",
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings-outline" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
