import React, { Fragment } from "react";
import { CLIENTES_QUERY } from "../queries/index";
import { Query } from "react-apollo";

import { Link } from "react-router-dom";

const Clientes = () => (
  <Query query={CLIENTES_QUERY}>
    {({ loading, error, data }) => {
      if (loading) {
        return <div>Loading...</div>;
      }
      if (error) {
        console.error(error);
        return <div>Error!</div>;
      }

      return (
        <Fragment>
          <h2 className="mt-2 text-center">Listados de Clientes</h2>
          <ul className="list-group mt-4">
            {data.getClientes.map(cliente => (
              <li key={cliente.id} className="list-group-item">
                <div className="row justify-content-between align-items-center">
                  <div className="col-md-8 d-flex justify-content-between align-items-center">
                    {cliente.nombre} - {cliente.empresa}
                  </div>
                  <div className="col-md-4 d-flex justify-content-end">
                    <Link
                      to={`/cliente/editar/${cliente.id}`}
                      className="btn btn-success d-block d-md-inline-block"
                    >
                      Editar Cliente
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Fragment>
      );
    }}
  </Query>
);

export default Clientes;
