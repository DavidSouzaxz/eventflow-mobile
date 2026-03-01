import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Link } from "expo-router";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Signup() {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.select({ ios: "padding", android: "height" })}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.contatiner}>
          <Text style={styles.title}>Cadastro</Text>
          <Text style={styles.subtitle}>Teste para saber se você é sigma.</Text>
          <View style={styles.form}>
            <Input placeholder="email" />
            <Input placeholder="Senha" secureTextEntry />
            <Input placeholder="Confirmar Senha" secureTextEntry />
            <Button label="Entrar" />
          </View>
          <Text style={styles.footerText}>
            Já tem uma conta?{" "}
            <Link href="/" style={styles.footeLink}>
              Login
            </Link>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  contatiner: {
    flex: 1,
    backgroundColor: "#FDFDFD",
    padding: 32,
    justifyContent: "center",
  },
  img: {
    height: 350,
    width: "100%",
    resizeMode: "contain",
    marginTop: 62,
    borderRadius: 45,
  },
  title: {
    fontSize: 32,
    fontWeight: 900,
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
