import { Ionicons } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import { useAuth } from "../contexts/AuthContexts";

export default function TabLayout() {
  const { user } = useAuth();
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
