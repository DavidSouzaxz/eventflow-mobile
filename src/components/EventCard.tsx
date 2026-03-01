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
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.img}
        defaultSource={require("@/assets/img2.png")}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>

        <View style={styles.infoRow}>
          <Ionicons name="calendar-outline" size={14} color="#64748B" />
          <Text style={styles.infoText}>{formatDate(date).full}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={14} color="#64748B" />
          <Text style={styles.infoText}>{location}</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#CBD5E1" />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    gap: 12,
  },
  content: { flex: 1 },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 8,
  },
  img: {
    width: 70,
    height: "100%",
    borderRadius: 12,
    backgroundColor: "#F1F5F9",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: "#64748B",
  },
});
