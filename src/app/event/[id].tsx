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
} from "react-native";

import { Event } from "@/app/types/events";
import { Input } from "@/components/Input";

export default function EventDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [coupon, setCoupon] = useState("");
  const PRICE_PER_TICKET = 5.0;

  useEffect(() => {
    setLoading(true);
    async function fetchEvent() {
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
      const bookignBody = {
        eventId: event?.id,
        quantity: quantity,
        coupoCode: coupon,
        batchId: event?.batches[0]?.id || null,
      };
      await api.post("/bookings", bookignBody);

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
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#032ad7" />
      </View>
    );

  if (!event)
    return (
      <View style={styles.center}>
        <Text>Evento não encontrado.</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        bounces={false}
        contentContainerStyle={{ paddingBottom: 190 }}
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

        <View style={styles.content}>
          <Text style={styles.title}>{event.title}</Text>

          <View style={styles.cardInfo}>
            <View style={styles.infoRow}>
              <View style={[styles.iconBox, { backgroundColor: "#EEF2FF" }]}>
                <Ionicons name="calendar" size={22} color="#032ad7" />
              </View>
              <View>
                <Text style={styles.infoLabel}>Data e Horário</Text>
                <Text style={styles.infoValue}>
                  {formatDate(event.date).full}
                </Text>
              </View>
            </View>

            <View style={[styles.infoRow, { marginTop: 20 }]}>
              <View style={[styles.iconBox, { backgroundColor: "#F0FDF4" }]}>
                <Ionicons name="location" size={22} color="#16A34A" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.infoLabel}>Localização</Text>
                <Text style={styles.infoValue}>{event.location}</Text>
              </View>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Sobre o evento</Text>
          <Text style={styles.description}>
            {event.description || "Nenhuma descrição detalhada fornecida."}
          </Text>
        </View>
      </ScrollView>

      {event.capacity === 0 ? (
        <View style={styles.solOut}>
          <Text style={styles.textOut}>Ingressos Esgotados</Text>
        </View>
      ) : (
        <View style={styles.footer}>
          <View style={styles.footerTop}>
            <View>
              <Text style={styles.priceLabel}>Preço Total</Text>
              <Text style={styles.priceValue}>
                R$ {(PRICE_PER_TICKET * quantity).toFixed(2)}
              </Text>
            </View>

            <View style={styles.quantitySelector}>
              <TouchableOpacity
                onPress={() => setQuantity((q) => Math.max(1, q - 1))}
                style={styles.qtyBtn}
              >
                <Ionicons name="remove" size={20} color="#1E293B" />
              </TouchableOpacity>

              <Text style={styles.qtyText}>{quantity}</Text>

              <TouchableOpacity
                onPress={() => setQuantity((q) => q + 1)}
                style={styles.qtyBtn}
                disabled={event.ticketLimitPerPerson <= quantity}
              >
                <Ionicons name="add" size={20} color="#1E293B" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.couponContainer}>
            <Input
              placeholder="CUPOM"
              style={styles.coupon}
              onChangeText={setCoupon}
            />
          </View>
          {!loading ? (
            <TouchableOpacity
              style={styles.reserveButton}
              onPress={handleReserve}
            >
              <Ionicons name="cart-outline" size={20} color="#FFF" />
              <Text style={styles.reserveButtonText}>Confirmar Reserva</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.reserveButton}>
              <ActivityIndicator size="large" color="#fff" />
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
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
  },
  content: {
    padding: 24,
    marginTop: -30,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1E293B",
    marginBottom: 20,
  },
  cardInfo: {
    backgroundColor: "#F8FAFC",
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#F1F5F9",
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
  infoValue: { fontSize: 15, color: "#334155", fontWeight: "600" },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 10,
  },
  description: { fontSize: 15, color: "#64748B", lineHeight: 22 },

  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#FFF",
    padding: 20,
    paddingBottom: 35,
    borderTopWidth: 1,
    borderColor: "#F1F5F9",
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
  priceValue: { color: "#032ad7", fontSize: 22, fontWeight: "900" },

  quantitySelector: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    borderRadius: 12,
    padding: 4,
  },
  qtyBtn: {
    width: 32,
    height: 32,
    backgroundColor: "#FFF",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  qtyText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E293B",
    paddingHorizontal: 15,
  },
  reserveButton: {
    backgroundColor: "#032ad7",
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
    backgroundColor: "#f5f5f5",
    padding: 20,
    paddingBottom: 35,
    borderTopWidth: 1,
    borderColor: "#F1F5F9",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  textOut: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginBottom: 15,
    fontWeight: 700,
    fontSize: 20,
  },
  couponContainer: {
    paddingBottom: 7,
  },
  coupon: {
    padding: 9,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#e0e0e0",
    color: "#032ad7",
    fontWeight: 500,
  },
});
