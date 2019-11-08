import React from "react";
import { ApolloConsumer } from "react-apollo";

import { withRouter } from "react-router-dom";

const cerrarSesionUsuario = (cliente, history) => {
  //Eliminamos el token
  localStorage.removeItem("token", "");

  //Desloguear
  cliente.resetStore();

  //Redireccionar al usuario
  history.push("/login");
};
const CerrarSesion = ({ history }) => (
  <ApolloConsumer>
    {cliente => {
      return (
        <button
          onClick={() => {
            cerrarSesionUsuario(cliente, history);
          }}
          type="button"
          className="btn btn-light ml-md-2 mt-2 mt-md-0"
        >
          Cerrar Sesión
        </button>
      );
    }}
  </ApolloConsumer>
);

export default withRouter(CerrarSesion);
