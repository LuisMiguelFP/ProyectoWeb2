// backend/src/routes/items.js
import express from "express";
import { body, validationResult } from "express-validator";
import Item from "../models/Item.js";

const router = express.Router();

// ✅ Obtener todos los ítems
router.get("/", async (req, res) => {
  try {
    const items = await Item.findAll();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener ítems", error: err.message });
  }
});

// ✅ Crear nuevo ítem
router.post(
  "/",
  [body("title").notEmpty().withMessage("El título es obligatorio")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, description } = req.body;
      const newItem = await Item.create({ title, description });
      res.status(201).json(newItem);
    } catch (err) {
      res.status(500).json({ message: "Error al crear ítem", error: err.message });
    }
  }
);

export default router;
