import express from "express";
import "dotenv/config";

import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./data/schema";
import { resolvers } from "./data/resolvers";

import initMongo from "./data/db";

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });

// servidor de apollo
server.applyMiddleware({ app });

//Puerto
app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"));


initMongo.connect(server.graphqlPath);
