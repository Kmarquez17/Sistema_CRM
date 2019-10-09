import mongoose, { Schema } from "mongoose";

const clientesSchema = new Schema({
  nombre: { type: String, maxlength: 50, required: true },
  apellido: { type: String, maxlength: 50, required: true },
  empresa: { type: String, maxlength: 50, required: true },
  emails: { type: Array, maxlength: 50, required: true },
  edad: { type: Number, required: true },
  tipo: { type: String, maxlength: 50, required: true },
  pedidos: { type: Array, required: true }
});

export default mongoose.model("clientes", clientesSchema);
