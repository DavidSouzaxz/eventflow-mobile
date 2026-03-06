import { api } from "@/app/services/api";
import { formatDate } from "@/utils/formatDate";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";

import { Event } from "@/app/types/events";
import { Input } from "@/components/Input";
import { Colors } from "@/constants/Colors"; // Importando seu arquivo de cores

export default function EventDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const theme = useColorScheme() ?? "light";
  const colors = Colors[theme];

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [coupon, setCoupon] = useState("");

  // Usando o preço do evento vindo da API
  const PRICE_PER_TICKET = event?.price || 0;

  useEffect(() => {
    async function fetchEvent() {
      setLoading(true);
      try {
        const response = await api.get<Event>(`/events/${id}`);
        setEvent(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchEvent();
  }, [id]);

  const handleReserve = async () => {
    setLoading(true);
    try {
      const bookingBody = {
        eventId: event?.id,
        quantity: quantity,
        couponCode: coupon, // Corrigido erro de digitação
        batchId: event?.batches[0]?.id || null,
      };

      await api.post("/bookings", bookingBody);

      Alert.alert(
        "Sucesso",
        `${quantity} ingresso(s) reservado(s) com sucesso!`,
      );
      router.replace("/(tabs)");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível completar a reserva.");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !event)
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );

  if (!event)
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text }}>Evento não encontrado.</Text>
      </View>
    );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
      />

      <ScrollView
        bounces={false}
        contentContainerStyle={{ paddingBottom: 220 }}
      >
        <View style={styles.header}>
          <Image source={{ uri: event.imageUrl }} style={styles.banner} />
          <View style={styles.overlay} />
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Ionicons name="chevron-back" size={28} color="#FFF" />
          </TouchableOpacity>
        </View>

        <View style={[styles.content, { backgroundColor: colors.background }]}>
          <Text style={[styles.title, { color: colors.text }]}>
            {event.title}
          </Text>

          <View
            style={[
              styles.cardInfo,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <View style={styles.infoRow}>
              <View
                style={[
                  styles.iconBox,
                  { backgroundColor: theme === "dark" ? "#1E293B" : "#EEF2FF" },
                ]}
              >
                <Ionicons name="calendar" size={22} color={colors.primary} />
              </View>
              <View>
                <Text style={styles.infoLabel}>Data e Horário</Text>
                <Text style={[styles.infoValue, { color: colors.text }]}>
                  {formatDate(event.date).full}
                </Text>
              </View>
            </View>

            <View style={[styles.infoRow, { marginTop: 20 }]}>
              <View
                style={[
                  styles.iconBox,
                  { backgroundColor: theme === "dark" ? "#064E3B" : "#F0FDF4" },
                ]}
              >
                <Ionicons name="location" size={22} color="#16A34A" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.infoLabel}>Localização</Text>
                <Text style={[styles.infoValue, { color: colors.text }]}>
                  {event.location}
                </Text>
              </View>
            </View>
          </View>

          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Sobre o evento
          </Text>
          <Text
            style={[styles.description, { color: colors.text, opacity: 0.7 }]}
          >
            {event.description || "Nenhuma descrição detalhada fornecida."}
          </Text>
        </View>
      </ScrollView>

      {event.capacity === 0 ? (
        <View
          style={[
            styles.solOut,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.textOut, { color: "#EF4444" }]}>
            Ingressos Esgotados
          </Text>
        </View>
      ) : (
        <View
          style={[
            styles.footer,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <View style={styles.footerTop}>
            <View>
              <Text style={styles.priceLabel}>Preço Total</Text>
              <Text style={[styles.priceValue, { color: colors.primary }]}>
                R$ {(PRICE_PER_TICKET * quantity).toFixed(2)}
              </Text>
            </View>

            <View
              style={[
                styles.quantitySelector,
                { backgroundColor: colors.background },
              ]}
            >
              <TouchableOpacity
                onPress={() => setQuantity((q) => Math.max(1, q - 1))}
                style={[styles.qtyBtn, { backgroundColor: colors.card }]}
              >
                <Ionicons name="remove" size={20} color={colors.text} />
              </TouchableOpacity>

              <Text style={[styles.qtyText, { color: colors.text }]}>
                {quantity}
              </Text>

              <TouchableOpacity
                onPress={() => setQuantity((q) => q + 1)}
                style={[styles.qtyBtn, { backgroundColor: colors.card }]}
                disabled={event.ticketLimitPerPerson <= quantity}
              >
                <Ionicons name="add" size={20} color={colors.text} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.couponContainer}>
            <Input
              placeholder="CUPOM"
              style={[
                styles.coupon,
                { borderColor: colors.border, color: colors.primary },
              ]}
              onChangeText={setCoupon}
              placeholderTextColor={theme === "dark" ? "#475569" : "#94A3B8"}
            />
          </View>

          <TouchableOpacity
            style={[styles.reserveButton, { backgroundColor: colors.primary }]}
            onPress={handleReserve}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <>
                <Ionicons name="cart-outline" size={20} color="#FFF" />
                <Text style={styles.reserveButtonText}>Confirmar Reserva</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: { height: 280 },
  banner: { width: "100%", height: "100%" },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.15)",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  content: {
    padding: 24,
    marginTop: -30,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 20,
  },
  cardInfo: {
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 24,
  },
  infoRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  infoLabel: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "600",
    textTransform: "uppercase",
  },
  infoValue: { fontSize: 15, fontWeight: "600" },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },
  description: { fontSize: 15, lineHeight: 22 },

  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 20,
    paddingBottom: 35,
    borderTopWidth: 1,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  footerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  priceLabel: { color: "#64748B", fontSize: 12 },
  priceValue: { fontSize: 22, fontWeight: "900" },

  quantitySelector: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    padding: 4,
  },
  qtyBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  qtyText: {
    fontSize: 16,
    fontWeight: "700",
    paddingHorizontal: 15,
  },
  reserveButton: {
    height: 54,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  reserveButtonText: { color: "#FFF", fontWeight: "700", fontSize: 16 },
  solOut: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 20,
    paddingBottom: 35,
    borderTopWidth: 1,
    alignItems: "center",
  },
  textOut: {
    fontWeight: "700",
    fontSize: 20,
  },
  couponContainer: {
    paddingBottom: 12,
  },
  coupon: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 12,
    fontSize: 14,
  },
});
