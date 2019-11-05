import Pedidos from "../../models/pedidos";
import Productos from "../../models/productos";

export const PedidosResolvers = {
  Query: {
    getPedidosCliente: async (root, { cliente }) => {
      try {
        const pedidos = await Pedidos.find({ cliente: cliente });

        return pedidos;
      } catch (error) {
        return error;
      }
    },
    getTopClientes: async root => {
      try {
        const topClientes = await Pedidos.aggregate([
          {
            $match: {
              estado: "COMPLETADO"
            }
          },
          {
            $group: {
              _id: "$cliente",
              total: { $sum: "$total" }
            }
          },
          {
            $lookup: {
              from: "clientes",
              localField: "_id",
              foreignField: "_id",
              as: "cliente"
            }
          },
          {
            $sort: {
              total: -1
            }
          },
          {
            $limit: 10
          }
        ]);        
       
        return topClientes;
      } catch (error) {
        return error;
      }
    }
  },
  Mutation: {
    crearPedido: (root, { input }) => {
      const nuevoPedido = new Pedidos({
        pedido: input.pedido,
        total: input.total,
        fecha: new Date(),
        cliente: input.cliente,
        estado: "PENDIENTE"
      });
      nuevoPedido.id = nuevoPedido._id;

      return new Promise((resolve, rejects) => {
        nuevoPedido.save(error => {
          if (error) rejects(error);
          else resolve(nuevoPedido);
        });
      });

      // try {
      //   const pedido = nuevoPedido.save();
      //   return pedido;
      // } catch (error) {
      //   return error;
      // }
    },
    actualizarEstado: async (root, { input }) => {
      try {
        let instruccion;
        const { id, estado } = input;

        //Traemos el estado anterior del pedido
        //Ya que si esta en anulado y pasa a pediente vuelve a sumar
        const estadoAnterior = await Pedidos.findOne({ _id: id });

        if (estadoAnterior.estado === "PENDIENTE" && estado === "COMPLETADO") {
          instruccion = "-";
        } else if (
          estadoAnterior.estado === "COMPLETADO" &&
          estado === "PENDIENTE"
        ) {
          instruccion = "+";
        } else if (
          estadoAnterior.estado === "COMPLETADO" &&
          estado === "ANULADO"
        ) {
          instruccion = "+";
        } else if (
          estadoAnterior.estado === "ANULADO" &&
          estado === "COMPLETADO"
        ) {
          instruccion = "-";
        } else {
          return;
        }

        //recorrer y actualizar la cantidad del producto
        input.pedido.forEach(pedido => {
          Productos.updateOne(
            { _id: pedido.id },
            {
              $inc: {
                stock: `${instruccion}${pedido.cantidad}`
              }
            },
            function(error) {
              if (error) return new Error(error);
            }
          );
        });

        const pedidos = await Pedidos.findByIdAndUpdate(
          { _id: input.id },
          input,
          {
            new: true
          }
        );

        let mensaje = "Se actualizo el estado del pedido correctamente...!";

        return mensaje;
      } catch (error) {
        return error;
      }
    }
  }
};
