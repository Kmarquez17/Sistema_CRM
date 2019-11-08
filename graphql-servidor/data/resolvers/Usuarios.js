// import "dotenv/config";
import Usuarios from "../../models/usuario";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const crearToken = (usuarioLogin, secreto, expiresIn) => {
  const { _id, usuario, rol } = usuarioLogin;

  const payload = {
    _id,
    usuario,
    rol
  };

  return jwt.sign(payload, secreto, { expiresIn });
};

export const UsuarioResolvers = {
  Query: {
    getUsuario: (root, args, { usuarioActual }) => {
      if (!usuarioActual) {
        return null;
      }

      //Obtener el usuario actual del request del jwt verificado
      const usuario = Usuarios.findOne({ usuario: usuarioActual.usuario });

      return usuario;
    }
  },
  Mutation: {
    crearUsuario: async (root, { usuario, nombre, password, rol }) => {
      // Buscar si el usuario ya esta registrado
      const existeUsuario = await Usuarios.findOne({ usuario });

      if (existeUsuario) {
        throw new Error("El usuario ya existe");
      }
      //Creamos el objeto del usuario, para poder guardarlo
      const nuevoUsuario = new Usuarios({
        usuario,
        nombre,
        password,
        rol
      });
      try {
        const usuario = await nuevoUsuario.save();
        return "Usuario creado Correctamente...!";
      } catch (error) {
        return error;
      }
    },
    autentificarUsuario: async (root, { usuario, password }) => {
      const nombreUsuario = await Usuarios.findOne({ usuario });

      if (!nombreUsuario) {
        throw new Error("Usuario no encontrado...!");
      }

      //Comparamos el password que esta guadardado con el que se envia desde el FRONT
      const passwordCorrecto = await bcrypt.compare(
        password,
        nombreUsuario.password
      );

      //Si el password es incorrecto
      if (!passwordCorrecto) {
        throw new Error("Contraseña Incorrecta...!");
      }

      return {
        token: crearToken(nombreUsuario, process.env.LLAVE_SECRETA, "1hr")
      };
    }
  }
};
