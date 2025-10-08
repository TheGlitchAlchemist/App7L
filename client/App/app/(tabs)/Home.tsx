import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from "react-native";

// ✅ cambia esta URL cada vez que reinicies ngrok
const BASE_URL = "https://aleta-logorrheic-trucklingly.ngrok-free.dev";

type Gasto = {
  id_usuario: number;
  categoria: string;
  descripcion: string;
  monto: number;
  fecha_gasto: string;
};

export default function Home() {
  const [gastos, setGastos] = useState<Gasto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGastos = async () => {
      try {
        const res = await fetch(`${BASE_URL}/gastos`);
        const data = await res.json();
        setGastos(data.data || []);
      } catch (error) {
        console.error("Error al obtener gastos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGastos();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#2e8b57" />
        <Text style={{ marginTop: 10 }}>Cargando gastos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Gastos Registrados</Text>
      <ScrollView style={styles.scrollVertical} showsVerticalScrollIndicator={true}>
        <ScrollView horizontal showsHorizontalScrollIndicator={true}>
          <View style={styles.table}>
            <View style={[styles.row, styles.headerRow]}>
              <Text style={[styles.cell, styles.headerCell]}>ID Usuario</Text>
              <Text style={[styles.cell, styles.headerCell]}>Categoría</Text>
              <Text style={[styles.cell, styles.headerCell]}>Descripción</Text>
              <Text style={[styles.cell, styles.headerCell]}>Monto</Text>
              <Text style={[styles.cell, styles.headerCell]}>Fecha</Text>
            </View>

            {gastos.map((g, i) => (
              <View key={i} style={[styles.row, i % 2 === 0 ? styles.rowLight : styles.rowDark]}>
                <Text style={styles.cell}>{g.id_usuario}</Text>
                <Text style={styles.cell}>{g.categoria}</Text>
                <Text style={styles.cell}>{g.descripcion}</Text>
                <Text style={styles.cell}>${g.monto}</Text>
                <Text style={styles.cell}>
                  {new Date(g.fecha_gasto).toLocaleDateString("es-MX", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "#f8f9fa" },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 20, color: "#14035cff" },
  scrollVertical: { maxHeight: "80%" },
  table: { width: 900, backgroundColor: "#fff", borderRadius: 12, overflow: "hidden", elevation: 3, shadowColor: "#000", shadowOpacity: 0.2, shadowOffset: { width: 0, height: 3 }, shadowRadius: 4 },
  headerRow: { backgroundColor: "#14035cff" },
  row: { flexDirection: "row" },
  rowLight: { backgroundColor: "#ffffff" },
  rowDark: { backgroundColor: "#f2f2f2" },
  cell: { flex: 1, paddingVertical: 18, textAlign: "center", fontSize: 17, color: "#333" },
  headerCell: { color: "#fff", fontWeight: "bold", fontSize: 18 },
});
