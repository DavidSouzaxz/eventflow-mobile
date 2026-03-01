import { api } from "@/app/services/api";
import { CameraView, useCameraPermissions } from "expo-camera";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Scanner() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [issubmitting, setIsSubmitting] = useState(false);

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Precisamos de permissão para usar a câmera
        </Text>
        <Button onPress={requestPermission} title="Conceder Permissão" />
      </View>
    );
  }

  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    setScanned(true);
    setIsSubmitting(true);

    const cleanId = data.replace("ticket-auth:", "");

    try {
      const response = await api.post("/tickets/check-in", {
        ticketId: cleanId,
      });

      Alert.alert("Sucesso!", "Check-in realizado com sucesso!");
    } catch (error: any) {
      const msg = error.response?.data?.message || "Erro ao validar QR Code";
      Alert.alert("Erro", msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
      />

      {issubmitting && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#FFF" />
          <Text style={{ color: "#FFF", marginTop: 10 }}>Validando...</Text>
        </View>
      )}

      {scanned && !issubmitting && (
        <View style={styles.buttonContainer}>
          <Button
            title="Escanear Novamente"
            onPress={() => setScanned(false)}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#000",
  },
  text: {
    color: "#FFF",
    textAlign: "center",
    marginBottom: 20,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 50,
    left: 20,
    right: 20,
  },
});
