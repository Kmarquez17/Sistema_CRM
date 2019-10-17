import mongoose, { Schema } from "mongoose";

const productosSchema = new Schema({
  nombre: { type: String, maxlength: 50, required: true },
  precio: { type: Number, required: true },
  stock: { type: Number, required: true }
});

export default mongoose.model("productos", productosSchema);
