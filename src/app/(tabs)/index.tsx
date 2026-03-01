import { api } from "@/app/services/api";
import { EventCard } from "@/components/EventCard";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description?: string;
  imageUrl: string;
}

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  async function fetchEvents() {
    try {
      const response = await api.get<Event[]>("/events");
      setEvents(response.data);
    } catch (error) {
      console.error("Erro ao carregar eventos:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchEvents();
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#032ad7" />
        <Text style={{ marginTop: 10 }}>Acordando o servidor...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              router.push({
                pathname: "/event/[id]",
                params: { id: item.id },
              });
            }}
          >
            <EventCard
              title={item.title}
              date={item.date}
              location={item.location}
              imageUrl={item.imageUrl}
            />
          </TouchableOpacity>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={() => (
          <View style={styles.center}>
            <Text style={styles.emptyText}>
              Nenhum evento disponível no momento.
            </Text>
          </View>
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  listContent: {
    padding: 20,
    paddingBottom: 40,
  },
  emptyText: {
    color: "#64748B",
    textAlign: "center",
  },
});
