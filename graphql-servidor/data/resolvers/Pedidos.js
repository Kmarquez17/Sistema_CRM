import Pedidos from "../../models/pedidos";
import Productos from "../../models/productos";

export const PedidosResolvers = {
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
      // console.log(nuevoPedido);

      return new Promise((resolve, rejects) => {
        //recorrer y actualizar la cantidad del producto
        input.pedido.forEach(pedido => {
          Productos.updateOne(
            { _id: pedido.id },
            {
              $inc: {
                stock: -pedido.cantidad
              }
            },
            function(error) {
              if (error) return new Error(error);
            }
          );
        });
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
    }
  }
};
