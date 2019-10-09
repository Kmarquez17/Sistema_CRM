import express from "express";
import "dotenv/config";
import graphqlHTTP from "express-graphql";
import { schema } from "./data/schema";
import initMongo from "./data/db";

const app = express();

app.get("/", (req, res) => {
  res.send("Todo listo papu :)..!");
});

app.use(
  "/graphql",
  graphqlHTTP({
    //Schema a utilizar
    schema: schema,
    graphiql: true
  })
);

//Puerto
app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"));

//Conexion base de datos
initMongo.connect();
