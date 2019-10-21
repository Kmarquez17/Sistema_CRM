//Dependencia
import React, { Fragment } from "react";
import { ApolloProvider } from "react-apollo";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { HashRouter, Switch, Route } from "react-router-dom";

import Header from "./components/Layout/Header";

//Componentes Clientes
import Clientes from "./pages/Clientes/Clientes";
import NuevoCliente from "./pages/Clientes/NuevoCliente";
import EditarCliente from "./pages/Clientes/EditarCliente";

//Componentes Productos
import Productos from "./pages/Productos/Productos";
import NuevoProducto from "./pages/Productos/NuevoProducto";
import EditarProducto from "./pages/Productos/EditarProducto";

const client = new ApolloClient({
  uri: "http://localhost:8080/graphql",
  cache: new InMemoryCache({
    addTypename: false
  }),
  onError: ({ networkError, graphqlErrors }) => {
    console.log("networkError ", networkError);
    console.log("graphqlErrors ", graphqlErrors);
  }
});

function App() {
  return (
    <ApolloProvider client={client}>
      <HashRouter>
        <Fragment>
          <Header />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Clientes} />
              <Route exact path="/clientes/nuevo" component={NuevoCliente} />
              <Route
                exact
                path="/clientes/editar/:id"
                component={EditarCliente}
              />

              <Route exact path="/productos" component={Productos} />
              <Route exact path="/productos/nuevo" component={NuevoProducto} />
              <Route
                exact
                path="/productos/editar/:id"
                component={EditarProducto}
              />
            </Switch>
          </div>
        </Fragment>
      </HashRouter>
    </ApolloProvider>
  );
}

export default App;
