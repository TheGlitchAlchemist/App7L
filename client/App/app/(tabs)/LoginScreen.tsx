import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { router } from "expo-router";

// ✅ cambia esta URL cada vez que reinicies ngrok
const BASE_URL = "https://aleta-logorrheic-trucklingly.ngrok-free.dev";

export default function LoginScreen() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!usuario.trim() || !password.trim()) {
      return Alert.alert("Faltan datos", "Ingresa usuario y contraseña.");
    }

    try {
      const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        return Alert.alert("Error", data.message || "Credenciales inválidas");
      }

      Alert.alert("Bienvenido", `Hola ${data.user.nombre}`);
      router.replace("/Home");
    } catch (err) {
      console.error(err);
      Alert.alert("Error de conexión", "No se pudo conectar al servidor.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>

      <TextInput
        style={styles.input}
        placeholder="Usuario o correo"
        value={usuario}
        onChangeText={setUsuario}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", paddingHorizontal: 30, backgroundColor: "#f5f5f5" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 30, textAlign: "center", color: "#333" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 12, marginBottom: 15, backgroundColor: "#fff" },
  button: { backgroundColor: "#007BFF", padding: 15, borderRadius: 8, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
