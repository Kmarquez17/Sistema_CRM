// import mongoose from "mongoose";
import Clientes from "../../models/clientes";
import { createError } from "apollo-errors";

//Funcion generica para mandar como mensaje cualquier error
const Error = message => {
  const FooError = createError("FooError", {
    message
  });
  throw new FooError({});
};

export const ClienteResolvers = {
  Query: {
    getClientes: (root, { limite, offset }) => {
      return Clientes.find({})
        .limit(limite)
        .skip(offset);
    },

    //Funcion con async y await
    getCliente: async (root, { id }) => {
      try {
        const cliente = await Clientes.findById({ _id: id });
        return cliente;
      } catch (error) {
        if (error.name === "CastError") {
          Error("Cliente no existente...!");
        } else {
          Error("Error Servidor");
        }
      }
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
        tipo: input.tipo
        // pedidos: input.pedidos
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
