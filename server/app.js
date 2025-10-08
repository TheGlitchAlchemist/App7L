import express from "express";
import cors from "cors";
import { db } from "./database.js";

const app = express();
app.use(express.json());

// ✅ CORS universal (funciona en Expo Web, móvil y ngrok)
// ✅ CORS que funciona con Expo Web y Ngrok
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});


// 🔹 Ruta de prueba
app.get("/ping", (req, res) => {
  db.query("SELECT 1 AS ok", (err) => {
    if (err) return res.status(500).json({ ok: false });
    res.json({ ok: true });
  });
});

// 🔹 LOGIN (simula login de tabla usuarios)
app.post("/login", (req, res) => {
  const { usuario, password } = req.body;
  if (!usuario || !password)
    return res.status(400).json({ success: false, message: "Faltan datos" });

  const sql = `
    SELECT id_usuario, nombre, correo, password
    FROM usuarios
    WHERE (correo = ? OR nombre = ?)
    LIMIT 1
  `;
  db.query(sql, [usuario, usuario], (err, rows) => {
    if (err) {
      console.error("❌ Error SQL:", err);
      return res.status(500).json({ success: false, message: "Error en servidor" });
    }

    if (!rows.length)
      return res.status(401).json({ success: false, message: "Usuario no encontrado" });

    const user = rows[0];
    if (password !== user.password)
      return res.status(401).json({ success: false, message: "Contraseña incorrecta" });

    res.json({
      success: true,
      user: {
        id: user.id_usuario,
        nombre: user.nombre,
        correo: user.correo,
      },
    });
  });
});

// 🔹 GASTOS (datos de tabla gastos)
app.get("/gastos", (req, res) => {
  const sql = "SELECT id_usuario, categoria, descripcion, monto, fecha_gasto FROM gastos";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Error al obtener gastos:", err);
      return res.status(500).json({ success: false, message: "Error al consultar base de datos" });
    }
    res.json({ success: true, data: results });
  });
});

// 🔹 PUERTO
const PORT = 3001;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`)
);
