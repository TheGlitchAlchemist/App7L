// server.js
import express from "express";
import cors from "cors";
import { db } from "./database.js";

const app = express();
app.use(express.json());

// ✅ CORS para Expo móvil + web
app.use(
  cors({
    origin: "*", // Acepta todas las conexiones (web, móvil, ngrok)
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Pragma",
      "Expires",
    ],
  })
);

// ✅ Evitar cache del navegador
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next();
});

// ✅ Test de conexión a MySQL
app.get("/ping", (req, res) => {
  db.query("SELECT 1 AS ok", (err) => {
    if (err) return res.status(500).json({ ok: false });
    res.json({ ok: true });
  });
});

// ✅ LOGIN
app.post("/login", (req, res) => {
  const loginRaw = (req.body.usuario || "").trim();
  const password = req.body.password || "";

  if (!loginRaw || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Faltan datos de inicio de sesión" });
  }

  const login = loginRaw.includes("@") ? loginRaw.toLowerCase() : loginRaw;

  const sql = `
    SELECT id_usuario, nombre, correo, password
    FROM usuarios
    WHERE (correo = ? OR nombre = ?)
    LIMIT 1
  `;

  db.query(sql, [login, login], (err, rows) => {
    if (err)
      return res.status(500).json({ success: false, message: "Error en servidor" });
    if (!rows || rows.length === 0)
      return res
        .status(401)
        .json({ success: false, message: "Usuario no encontrado" });

    const user = rows[0];
    if (password !== user.password) {
      return res
        .status(401)
        .json({ success: false, message: "Contraseña incorrecta" });
    }

    return res.json({
      success: true,
      message: "Inicio de sesión exitoso",
      user: {
        id: user.id_usuario,
        nombre: user.nombre,
        correo: user.correo,
      },
    });
  });
});

// ✅ GASTOS
app.get("/gastos", (req, res) => {
  const sql =
    "SELECT id_usuario, categoria, descripcion, monto, fecha_gasto FROM gastos";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Error al obtener gastos:", err);
      return res
        .status(500)
        .json({ success: false, message: "Error al consultar la base de datos" });
    }

    res.json({
      success: true,
      data: results,
    });
  });
});

// ✅ Arranque del servidor
const PORT = 3001;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
