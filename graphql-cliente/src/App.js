//Dependencia
import React, { Fragment } from "react";
import { ApolloProvider } from "react-apollo";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { HashRouter, Switch, Route } from "react-router-dom";

//Componentes
import Header from "./components/Header";
import Clientes from "./components/Clientes";
import NuevoCliente from "./components/NuevoCliente";
import EditarCliente from "./components/EditarCliente";

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
              <Route exact path="/cliente/nuevo" component={NuevoCliente} />
              <Route
                exact
                path="/cliente/editar/:id"
                component={EditarCliente}
              />
            </Switch>
          </div>
        </Fragment>
      </HashRouter>
    </ApolloProvider>
  );
}

export default App;
