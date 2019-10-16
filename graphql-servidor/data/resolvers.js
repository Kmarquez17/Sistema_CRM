// import mongoose from "mongoose";
import Clientes from "../models/clientes";

export const resolvers = {
  Query: {
    getClientes: (root, { limite, offset }) => {
      return Clientes.find({})
        .limit(limite)
        .skip(offset);
    },

    getCliente: (root, { id }) => {
      return new Promise((resolve, rejects) => {
        Clientes.findById(id, (error, cliente) => {
          if (error) return rejects(error);
          else resolve(cliente);
        });
      });
    },
    totalClientes: root => {
      return new Promise((resolve, rejects) => {
        Clientes.countDocuments({}, (error, count) => {
          if (error) return rejects(error);
          else resolve(count);
        });
      });
    }
  },
  Mutation: {
    crearCliente: (root, { input }) => {
      const nuevoCliente = new Clientes({
        nombre: input.nombre,
        apellido: input.apellido,
        empresa: input.empresa,
        emails: input.emails,
        // email: input.email,
        edad: input.edad,
        tipo: input.tipo,
        pedidos: input.pedidos
      });
      nuevoCliente.id = nuevoCliente._id;

      return new Promise((resolve, rejects) => {
        nuevoCliente.save(error => {
          if (error) rejects(error);
          else resolve(nuevoCliente);
        });
      });
    },
    actualizarCliente: (root, { input }) => {
      return new Promise((resolve, rejects) => {
        Clientes.findOneAndUpdate(
          { _id: input.id },
          input,
          { new: true },
          (error, cliente) => {
            if (error) rejects(error);
            else resolve(cliente);
          }
        );
      });
    },
    eliminarCliente: (root, { id }) => {
      return new Promise((resolve, rejects) => {
        Clientes.findByIdAndRemove({ _id: id }, error => {
          if (error) rejects(error);
          else resolve("Se elimino el cliente correctamente...!");
        });
      });
    }
  }
};
