import { useAuth } from "@/app/contexts/AuthContexts";
import { Colors } from "@/constants/Colors";
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
  const { user, signOut, theme, toggleTheme } = useAuth();
  const colors = Colors[theme];

  const navigation = useNavigation();
  const [name, setName] = useState(user?.name);
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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity
          style={[styles.buttonRollback, { backgroundColor: colors.primary }]}
          onPress={() => navigation.goBack()}
        >
          <Text style={{ color: "#FFF", fontWeight: "bold" }}>Voltar</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Image
              source={{
                uri: user?.avatarUrl,
              }}
              style={[styles.avatar, { backgroundColor: colors.card }]}
            />
            <View
              style={[
                styles.editBadge,
                {
                  backgroundColor: colors.primary,
                  borderColor: colors.background,
                },
              ]}
            >
              <Ionicons name="camera" size={16} color="#FFF" />
            </View>
          </View>
          <Text style={[styles.userEmail, { color: colors.text }]}>
            {user?.email}
          </Text>
        </View>

        <View style={[styles.section, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Dados Pessoais
          </Text>
          <Text style={[styles.label, { color: colors.text }]}>
            Nome Completo
          </Text>
          <TextInput
            style={[
              styles.input,
              { backgroundColor: colors.background, color: colors.text },
            ]}
            value={name}
            onChangeText={setName}
          />
          <TouchableOpacity
            style={[styles.saveButton, { backgroundColor: colors.primary }]}
            onPress={handleSaveProfile}
          >
            <Text style={styles.saveButtonText}>Salvar Alterações</Text>
          </TouchableOpacity>
        </View>

        {/* Card de Preferências */}
        <View style={[styles.section, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Preferências
          </Text>

          <View style={styles.row}>
            <View style={styles.rowInfo}>
              <Ionicons name="moon-outline" size={22} color={colors.text} />
              <Text style={[styles.rowText, { color: colors.text }]}>
                Modo Escuro
              </Text>
            </View>
            <Switch
              value={theme === "dark"}
              onValueChange={toggleTheme}
              trackColor={{ false: "#CBD5E1", true: colors.primary }}
            />
          </View>
        </View>

        {/* Botão Sair */}
        <TouchableOpacity
          style={[
            styles.section,
            styles.logoutButton,
            { backgroundColor: colors.card },
          ]}
          onPress={() => {
            Alert.alert(
              "Sair da conta",
              "Tem certeza que deseja encerrar sua sessão?",
              [
                {
                  text: "Cancelar",
                  style: "cancel",
                },
                {
                  text: "Sair",
                  style: "destructive",
                  onPress: () => signOut(), // Chama a função que limpa storage e redireciona
                },
              ],
            );
          }}
        >
          <Ionicons name="log-out-outline" size={22} color="#EF4444" />
          <Text style={styles.logoutText}>Sair da Conta</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 20 },
  header: { alignItems: "center", marginVertical: 30 },
  avatarContainer: { position: "relative" },
  avatar: { width: 100, height: 100, borderRadius: 50 },
  editBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    padding: 8,
    borderRadius: 20,
    borderWidth: 3,
  },
  userEmail: { marginTop: 10, fontSize: 14, opacity: 0.7 },
  section: { borderRadius: 20, padding: 20, marginBottom: 20 },
  sectionTitle: { fontSize: 16, fontWeight: "700", marginBottom: 20 },
  label: { fontSize: 13, marginBottom: 8 },
  input: { padding: 12, borderRadius: 12, fontSize: 16 },
  saveButton: {
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: { color: "#FFF", fontWeight: "700" },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowInfo: { flexDirection: "row", alignItems: "center", gap: 12 },
  rowText: { fontSize: 16, fontWeight: "500" },
  logoutButton: { flexDirection: "row", justifyContent: "center", gap: 12 },
  logoutText: { color: "#EF4444", fontWeight: "700" },
  buttonRollback: {
    width: 80,
    borderRadius: 8,
    padding: 8,
    alignItems: "center",
  },
});
