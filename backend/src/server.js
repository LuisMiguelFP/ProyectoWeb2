import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/db.js";
import User from "./models/User.js";
import Item from "./models/Item.js";
import authRoutes from "./routes/auth.js";
import itemRoutes from "./routes/items.js"; // ✅ importa las rutas de items

dotenv.config();

const app = express();

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173", // permite tu frontend
    credentials: true,
  })
);
app.use(express.json());

// ✅ Rutas principales
app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes); // ✅ ahora tu frontend podrá acceder a /api/items

// Ruta base (solo para probar)
app.get("/", (req, res) => {
  res.json({ message: "Servidor funcionando correctamente 🚀" });
});

// Sincronizar base de datos y levantar el servidor
const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await sequelize.sync(); // crea las tablas si no existen
    console.log("✅ Base de datos sincronizada correctamente.");

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error al conectar con la base de datos:", error);
  }
})();
