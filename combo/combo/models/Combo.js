import mongoose from "mongoose";

const comboSchema = new mongoose.Schema({
  nombre: String,
  base: String,
  ingredientes: [String],
  bebida: String,
  precioTotal: Number,
  caloriasTotales: Number,
});

export default mongoose.models.Combo || mongoose.model("Combo", comboSchema);