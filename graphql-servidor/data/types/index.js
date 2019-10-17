import { mergeTypes } from "merge-graphql-schemas";
import { importSchema } from "graphql-import";

const Clientes = importSchema("data/types/Clientes.graphql");
const Productos = importSchema("data/types/Productos.graphql");

const typeDefs = [Clientes, Productos];

export default mergeTypes(typeDefs, { all: true });
