//Dependencia
import React, { Fragment } from "react";

import { HashRouter, Switch, Route, Redirect } from "react-router-dom";

import Header from "./components/Layout/Header";

//Componentes Clientes
import Clientes from "./pages/Clientes/Clientes";
import NuevoCliente from "./pages/Clientes/NuevoCliente";
import EditarCliente from "./pages/Clientes/EditarCliente";

//Componentes Productos
import Productos from "./pages/Productos/Productos";
import NuevoProducto from "./pages/Productos/NuevoProducto";
import EditarProducto from "./pages/Productos/EditarProducto";

//Componentes Pedidos
import NuevosPedidos from "./pages/Pedidos/NuevosPedidos";
import PedidosCliente from "./pages/Pedidos/PedidosCliente";

//Componentes Panel
import Panel from "./components/Panel/Panel";

//Componentes Auth
import Registro from "./pages/Auth/Registro";
import Login from "./pages/Auth/Login";

import Session from "./components/Session";

const App = ({ refetch, session }) => {
  console.log(session);
  const { getUsuario } = session;

  const mensaje = getUsuario ? (
    `Bienvenido: ${getUsuario.nombre}`
  ) : (
    <Redirect to="/login/" />
  );

  return (
    <HashRouter>
      <Fragment>
        <Header session={session} />
        <div className="container">
          <p className="text-right">{mensaje}</p>
          <Switch>
            <Route
              exact
              path="/clientes"
              render={() => <Clientes session={session} />}
            />
            <Route
              exact
              path="/clientes/nuevo"
              render={() => <NuevoCliente session={session} />}
            />
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
            <Route exact path="/pedidos/nuevo/:id" component={NuevosPedidos} />
            <Route exact path="/pedidos/:id" component={PedidosCliente} />
            <Route exact path="/panel" component={Panel} />
            <Route exact path="/registro" component={Registro} />
            <Route
              exact
              path="/login"
              render={() => <Login refetch={refetch} />}
            />
          </Switch>
        </div>
      </Fragment>
    </HashRouter>
  );
};

const RootSession = Session(App);

export { RootSession };
