import { useAuth } from "@/app/contexts/AuthContexts";
import { Colors } from "@/constants/Colors";
import { formatDate } from "@/utils/formatDate";
import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, View } from "react-native";

interface Props {
  title: string;
  date: string;
  location: string;
  imageUrl: string;
}

export function EventCard({ title, date, location, imageUrl }: Props) {
  const { theme } = useAuth();
  const colors = Colors[theme];

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
        },
      ]}
    >
      <Image
        source={{ uri: imageUrl }}
        style={[
          styles.img,
          { backgroundColor: theme === "dark" ? "#334155" : "#F1F5F9" },
        ]}
        defaultSource={require("@/assets/img2.png")}
      />

      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>

        <View style={styles.infoRow}>
          <Ionicons
            name="calendar-outline"
            size={14}
            color={colors.text}
            style={{ opacity: 0.7 }}
          />
          <Text style={[styles.infoText, { color: colors.text, opacity: 0.8 }]}>
            {formatDate(date).full}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons
            name="location-outline"
            size={14}
            color={colors.text}
            style={{ opacity: 0.7 }}
          />
          <Text style={[styles.infoText, { color: colors.text, opacity: 0.8 }]}>
            {location}
          </Text>
        </View>
      </View>

      <Ionicons name="chevron-forward" size={20} color={colors.border} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    gap: 12,
  },
  content: { flex: 1 },
  title: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
  },
  img: {
    width: 70,
    height: 70, // Importante: imagem precisa de altura fixa ou definida no flex
    borderRadius: 12,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
  },
});
