import { api } from "@/app/services/api";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Link, router } from "expo-router";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { storage } from "../services/storage";
import { AuthResponse } from "../types/auth";

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email || !password) {
      alert("Preencha todos os campos");
      return;
    }

    try {
      setLoading(true);
      const response = await api.post<AuthResponse>("/login", {
        email,
        password,
      });
      const { token, user } = response.data;

      await storage.saveAuthData(token, user);

      router.replace("/(tabs)");
    } catch (err) {
      setLoading(false);
      alert("Erro ao fazer login. Verifique suas credencias.");
      err;
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <ScrollView
        contentContainerStyle={styles.contatiner}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.form}>
          <Image style={styles.img} source={require("../../assets/img1.png")} />

          <Input
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={setEmail}
          />
          <Input
            placeholder="Senha"
            secureTextEntry
            onChangeText={setPassword}
          />

          <Button
            label={loading ? "Carregando..." : "Entrar"}
            disabled={loading}
            onPress={handleLogin}
          />
          <Text style={styles.footerText}>
            Ainda não tem conta?
            <Link href="/signup" style={styles.footeLink}>
              Cadastre-se
            </Link>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  contatiner: {
    flexGrow: 1,
    backgroundColor: "#FDFDFD",
    padding: 32,
    justifyContent: "center",
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    height: 350,
    width: "100%",
    resizeMode: "contain",
    marginTop: 62,
    borderRadius: 45,
  },
  title: {
    fontSize: 22,
    fontWeight: 600,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
  },
  form: {
    marginTop: 24,
    gap: 12,
  },
  footerText: {
    textAlign: "center",
    marginTop: 24,
    color: "#585860",
  },
  footeLink: {
    color: "#032ad7",
    fontWeight: 700,
  },
});
