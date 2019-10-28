// import mongoose from "mongoose";
import Productos from "../../models/productos";

export const ProductoResolvers = {
  Query: {
    getProductos: async (root, { limite, offset }) => {
      try {
        const productos = await Productos.find({})
          .limit(limite)
          .skip(offset);

        // console.log(productos);
        return productos;
      } catch (error) {
        return error;
      }
    },
    getProducto: async (root, { id }) => {
      try {
        const producto = await Productos.findById({ _id: id });
        return producto;
      } catch (error) {
        return error;
      }

      // return new Promise((resolve, rejects) => {
      //   Productos.findById(id, (error, producto) => {
      //     if (error) return rejects(error);
      //     else resolve(producto);
      //   });
      // });
    },
    totalProductos: async root => {
      try {
        const totalProd = await Productos.countDocuments({});
        return totalProd;
      } catch (error) {
        return error;
      }
    }
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
    },
    actualizarProducto: async (roor, { input }) => {
      try {
        const producto = await Productos.findByIdAndUpdate(
          { _id: input.id },
          input,
          { new: true }
        );
        return producto;
      } catch (error) {
        return error;
      }
    },
    eliminarProducto: async (root, { id }) => {
      try {
        const producto = await Productos.findOneAndRemove({ _id: id });
        let mensaje = "Se elimino el producto correctamente...!";
        return mensaje;
      } catch (error) {
        return error;
      }
    }
  }
};
