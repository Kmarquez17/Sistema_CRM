import mongoose, { Schema } from "mongoose";

const pedidosSchema = new Schema({
  pedido: { type: Array, required: true },
  total: { type: Number, required: true },
  fecha: { type: Date },
  cliente: { type: String, maxlength: 50, required: true },
  estado: { type: String }
});

export default mongoose.model("pedidos", pedidosSchema);
