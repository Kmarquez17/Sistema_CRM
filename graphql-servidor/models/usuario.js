import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const usuarioSchema = new Schema({
  usuario: { type: String, maxlength: 50, required: true, unique: true },
  nombre: { type: String, maxlength: 50, required: true },
  password: { type: String, maxlength: 50, required: true },
  rol: { type: String, equired: true }
});

usuarioSchema.pre("save", function(next) {
  //si el password no esta modificado
  if (!this.isModified("password")) {
    return next();
  }

  bcrypt.genSalt(10, (error, salt) => {
    if (error) return next(error);

    bcrypt.hash(this.password, salt, (error, hash) => {
      if (error) return next(error);
      this.password = hash;
      next();
    });
  });
});

export default mongoose.model("usuarios", usuarioSchema);
