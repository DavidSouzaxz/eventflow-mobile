import { useAuth } from "@/app/contexts/AuthContexts";
import { Button } from "@/components/Button";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Settings() {
  const { user, signOut } = useAuth();
  console.log("User data:", user); // Adicionado para debugar os dados do usuário

  const navigation = useNavigation();

  const [name, setName] = useState(user?.name);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar o perfil.");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePhoto = () => {
    Alert.alert("Alterar Foto", "Abrir galeria de imagens...");
    // Aqui você usaria o expo-image-picker
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Button
          label="Voltar"
          style={styles.buttonRollback}
          onPress={() => {
            navigation.goBack();
          }}
        />
        {/* Seção do Avatar */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={handleChangePhoto}
            style={styles.avatarContainer}
          >
            <Image
              source={{
                uri: user?.avatarUrl,
              }}
              style={styles.avatar}
            />
            <View style={styles.editBadge}>
              <Ionicons name="camera" size={16} color="#FFF" />
            </View>
          </TouchableOpacity>
          <Text style={styles.userEmail}>{user?.email}</Text>
        </View>

        {/* Formulário de Perfil */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dados Pessoais</Text>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nome Completo</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Seu nome"
            />
          </View>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSaveProfile}
            disabled={loading}
          >
            <Text style={styles.saveButtonText}>
              {loading ? "Salvando..." : "Salvar Alterações"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Preferências do App */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferências</Text>

          <View style={styles.row}>
            <View style={styles.rowInfo}>
              <Ionicons name="moon-outline" size={22} color="#1E293B" />
              <Text style={styles.rowText}>Modo Escuro</Text>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={setIsDarkMode}
              trackColor={{ false: "#CBD5E1", true: "#032ad7" }}
            />
          </View>

          <TouchableOpacity style={styles.row}>
            <View style={styles.rowInfo}>
              <Ionicons
                name="notifications-outline"
                size={22}
                color="#1E293B"
              />
              <Text style={styles.rowText}>Notificações</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
          </TouchableOpacity>
        </View>

        {/* Conta */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
            <Ionicons name="log-out-outline" size={22} color="#EF4444" />
            <Text style={styles.logoutText}>Sair da Conta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  scrollContent: { padding: 20, paddingBottom: 40 },
  header: { alignItems: "center", marginVertical: 30 },
  avatarContainer: { position: "relative" },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50, // Para ficar redonda
    backgroundColor: "#EEE",
  },
  editBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#032ad7",
    padding: 8,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "#F8FAFC",
  },
  userEmail: { marginTop: 10, color: "#64748B", fontSize: 14 },
  section: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 20,
  },
  label: { fontSize: 13, color: "#64748B", marginBottom: 8, fontWeight: "500" },
  input: {
    backgroundColor: "#F1F5F9",
    padding: 12,
    borderRadius: 12,
    fontSize: 16,
    color: "#1E293B",
  },
  saveButton: {
    backgroundColor: "#032ad7",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: { color: "#FFF", fontWeight: "700", fontSize: 15 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  rowInfo: { flexDirection: "row", alignItems: "center", gap: 12 },
  rowText: { fontSize: 16, color: "#1E293B", fontWeight: "500" },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    justifyContent: "center",
    paddingVertical: 10,
  },
  logoutText: { color: "#EF4444", fontWeight: "700", fontSize: 16 },
  inputGroup: {},
  buttonRollback: {
    color: "#032ad7",
    backgroundColor: "#032ad7",
    width: 80,
    borderRadius: 5,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
});
