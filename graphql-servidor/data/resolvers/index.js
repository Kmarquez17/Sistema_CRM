import { mergeResolvers } from "merge-graphql-schemas";

import { ClienteResolvers } from "./Clientes";
import { ProductoResolvers } from "./Productos";
import { PedidosResolvers } from "./Pedidos";
import { UsuarioResolvers } from "./Usuarios";

const resolvers = [
  ClienteResolvers,
  ProductoResolvers,
  PedidosResolvers,
  UsuarioResolvers
];

// console.log(resolvers)
// console.log(ClientesResolvers)
// console.log(ProductosResolvers);

export default mergeResolvers(resolvers);
