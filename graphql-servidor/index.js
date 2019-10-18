import "dotenv/config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { formatError } from "apollo-errors";

// import typeDefs from "./data/types";
// import resolvers from "./data/resolvers";

import schema from "./data/index";
import initMongo from "./data/db";

const app = express();
const server = new ApolloServer({ schema, formatError });

// servidor de apollo
server.applyMiddleware({ app });

//Puerto
app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"));

initMongo.connect(server.graphqlPath);
