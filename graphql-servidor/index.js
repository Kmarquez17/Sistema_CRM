import "dotenv/config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { formatError } from "apollo-errors";
import jwt from "jsonwebtoken";

// import typeDefs from "./data/types";
// import resolvers from "./data/resolvers";

import schema from "./data/index";
import initMongo from "./data/db";

const app = express();
const server = new ApolloServer({
  schema,
  formatError,
  context: async ({ req }) => {
    // Extraemos el token mandado desde las configuraciones de apollo-client
    const token = await req.headers["authorization"];

    //Verificamos que en la primera iteracion no sea nulo
    if (token !== "null") {
      try {
        //Si es distinto de nulo verificamos que el token sea válido
        const usuarioActual = await jwt.verify(
          token,
          process.env.LLAVE_SECRETA
        );

        //Si es válido se lo agreamos al request del apollo-server
        req.usuarioActual = usuarioActual;

        return {
          usuarioActual
        };
      } catch (error) {}
    }
  }
});

// servidor de apollo
server.applyMiddleware({ app });

//Puerto
app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"));

initMongo.connect(server.graphqlPath);
