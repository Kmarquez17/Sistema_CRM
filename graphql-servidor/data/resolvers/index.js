import { mergeResolvers } from "merge-graphql-schemas";

import { ClienteResolvers } from "./Clientes";
import { ProductoResolvers } from "./Productos";

const resolvers = [ClienteResolvers, ProductoResolvers];

// console.log(resolvers)
// console.log(ClientesResolvers)
// console.log(ProductosResolvers);

export default mergeResolvers(resolvers);
