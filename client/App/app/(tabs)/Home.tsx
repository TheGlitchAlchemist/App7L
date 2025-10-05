import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from "react-native";

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

  const BASE_URL = "http://localhost:3001/gastos";

  useEffect(() => {
    const fetchGastos = async () => {
      try {
        const res = await fetch(BASE_URL);
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
      <ScrollView horizontal>
        <View style={styles.table}>
          {/* Encabezado */}
          <View style={[styles.row, styles.headerRow]}>
            <Text style={[styles.cell, styles.headerCell]}>ID Usuario</Text>
            <Text style={[styles.cell, styles.headerCell]}>Categoría</Text>
            <Text style={[styles.cell, styles.headerCell]}>Descripción</Text>
            <Text style={[styles.cell, styles.headerCell]}>Monto</Text>
            <Text style={[styles.cell, styles.headerCell]}>Fecha</Text>
          </View>

          {/* Filas dinámicas */}
          {gastos.map((g, i) => (
            <View
              key={`${g.id_usuario}-${i}`}
              style={[
                styles.row,
                i % 2 === 0 ? styles.rowLight : styles.rowDark,
              ]}
            >
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8f9fa"
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#14035cff"
  },
  table: {
    width: 900,
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
  },
  headerRow: {
    backgroundColor: "#14035cff",
  },
  row: {
    flexDirection: "row",
  },
  rowLight: {
    backgroundColor: "#ffffff",
  },
  rowDark: {
    backgroundColor: "#f2f2f2",
  },
  cell: {
    flex: 1,
    paddingVertical: 18,
    textAlign: "center",
    fontSize: 17,
    color: "#333",
  },
  headerCell: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});






























// import React, { useEffect, useState } from "react";
// import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from "react-native";

// export default function Home() {
//   const [usuarios, setUsuarios] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const BASE_URL = "http://localhost:8080/usuarios"; // cambia si usas IP real

//   useEffect(() => {
//     const fetchUsuarios = async () => {
//       try {
//         const res = await fetch(BASE_URL);
//         const data = await res.json();
//         setUsuarios(data);
//       } catch (error) {
//         console.error("Error al obtener usuarios:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUsuarios();
//   }, []);

//   if (loading) {
//     return (
//       <View style={styles.container}>
//         <ActivityIndicator size="large" color="#2e8b57" />
//         <Text style={{ marginTop: 10 }}>Cargando usuarios...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Lista de Usuarios</Text>
//       <ScrollView horizontal>
//         <View style={styles.table}>
//           {/* Encabezado */}
//           <View style={[styles.row, styles.headerRow]}>
//             <Text style={[styles.cell, styles.headerCell]}>ID</Text>
//             <Text style={[styles.cell, styles.headerCell]}>Nombre</Text>
//             <Text style={[styles.cell, styles.headerCell]}>Correo</Text>
//             <Text style={[styles.cell, styles.headerCell]}>Rol</Text>
//           </View>

//           {/* Filas dinámicas */}
//           {usuarios.map((u, i) => (
//             <View
//               key={u.id}
//               style={[
//                 styles.row,
//                 i % 2 === 0 ? styles.rowLight : styles.rowDark,
//               ]}
//             >
//               <Text style={styles.cell}>{u.id}</Text>
//               <Text style={styles.cell}>{u.nombre}</Text>
//               <Text style={styles.cell}>{u.correo}</Text>
//               <Text style={styles.cell}>{u.rol}</Text>
//             </View>
//           ))}
//         </View>
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { 
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//     backgroundColor: "#f8f9fa"
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: "bold",
//     marginBottom: 20,
//     color: "#14035cff"
//   },
//   table: {
//     width: 700,
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     overflow: "hidden",
//     elevation: 3, // sombra Android
//     shadowColor: "#000", // sombra iOS
//     shadowOpacity: 0.2,
//     shadowOffset: { width: 0, height: 3 },
//     shadowRadius: 4,
//   },
//   headerRow: {
//     backgroundColor: "#14035cff",
//   },
//   row: {
//     flexDirection: "row",
//   },
//   rowLight: {
//     backgroundColor: "#ffffff",
//   },
//   rowDark: {
//     backgroundColor: "#f2f2f2",
//   },
//   cell: {
//     flex: 1,
//     paddingVertical: 18,
//     textAlign: "center",
//     fontSize: 18,
//     color: "#333",
//   },
//   headerCell: {
//     color: "#fff",
//     fontWeight: "bold",
//     fontSize: 19,
//   },
// });
