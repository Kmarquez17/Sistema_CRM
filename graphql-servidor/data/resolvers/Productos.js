// import mongoose from "mongoose";
import Productos from "../../models/productos";

export const ProductoResolvers = {
  Query: {
    // getProducto: (root, { id }) => {
    //   return new Promise((resolve, rejects) => {
    //     Productos.findById(id, (error, producto) => {
    //       if (error) return rejects(error);
    //       else resolve(producto);
    //     });
    //   });
    // },
  },
  Mutation: {
    crearProducto: (root, { input }) => {
      const nuevoProducto = new Productos({
        nombre: input.nombre,
        precio: input.precio,
        stock: input.stock
      });

      nuevoProducto.id = nuevoProducto._id;

      return new Promise((resolve, rejects) => {
        nuevoProducto.save(error => {
          if (error) rejects(error);
          else resolve(nuevoProducto);
        });
      });
    }
  }
};
