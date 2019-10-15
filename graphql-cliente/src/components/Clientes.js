import React, { Fragment } from "react";
import { CLIENTES_QUERY } from "../queries/index";
import { ELIMINAR_CLIENTE } from "../mutations/index";

import { Query, Mutation } from "react-apollo";

import { Link } from "react-router-dom";

const Clientes = () => (
  <Query query={CLIENTES_QUERY} pollInterval={1000}>
    {({ loading, error, data, startPolling, stopPolling }) => {
      if (loading) return "Cargando...!";
      if (error) return `Error : ${error}`;

      return (
        <Fragment>
          <h2 className="mt-2 text-center">Listados de Clientes</h2>
          <ul className="list-group mt-4">
            {data.getClientes.map(cliente => {
              //Se hace implicito el ID ya que da error cuando se pasa cliente.id
              const { id } = cliente;
              return (
                <li key={cliente.id} className="list-group-item">
                  <div className="row justify-content-between align-items-center">
                    <div className="col-md-8 d-flex justify-content-between align-items-center">
                      {cliente.nombre} - {cliente.empresa}
                    </div>
                    <div className="col-md-4 d-flex justify-content-end">
                      <Mutation mutation={ELIMINAR_CLIENTE}>
                        {eliminarCliente => (
                          <button
                            type="button"
                            className="btn btn-danger mr-2"
                            onClick={() => {
                              if (
                                window.confirm(
                                  "Seguro que deseas eliminar este cliente?"
                                )
                              ) {
                                eliminarCliente({ variables: { id } });
                              }
                            }}
                          >
                            &times; Eliminar
                          </button>
                        )}
                      </Mutation>
                      <Link
                        to={`/cliente/editar/${id}`}
                        className="btn btn-success d-block d-md-inline-block"
                      >
                        Editar Cliente
                      </Link>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Fragment>
      );
    }}
  </Query>
);

export default Clientes;
