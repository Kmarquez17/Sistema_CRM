import { mergeResolvers } from "merge-graphql-schemas";

import { ClienteResolvers } from "./Clientes";
import { ProductoResolvers } from "./Productos";
import { PedidosResolvers } from "./Pedidos";

const resolvers = [ClienteResolvers, ProductoResolvers, PedidosResolvers];

// console.log(resolvers)
// console.log(ClientesResolvers)
// console.log(ProductosResolvers);

export default mergeResolvers(resolvers);
