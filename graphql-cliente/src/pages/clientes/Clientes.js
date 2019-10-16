import React, { Component, Fragment } from "react";
import { Query, Mutation } from "react-apollo";
import { Link } from "react-router-dom";

import { CLIENTES_QUERY } from "../../queries";
import { ELIMINAR_CLIENTE } from "../../mutations";

import Paginador from "../../components/Paginador";
import Buscador from "../../components/Buscador";

class Clientes extends Component {
  state = {
    paginador: {
      limite: 5,
      pagActual: 1,
      offset: 0
    },
    filtro: ""
  };

  paginaSiguiente = () => {
    this.setState({
      paginador: {
        ...this.state.paginador,
        offset: this.state.paginador.offset + this.state.paginador.limite,
        pagActual: this.state.paginador.pagActual + 1
      }
    });
  };

  paginaAnterior = () => {
    this.setState({
      paginador: {
        ...this.state.paginador,
        offset: this.state.paginador.offset - this.state.paginador.limite,
        pagActual: this.state.paginador.pagActual - 1
      }
    });
  };

  handleChangeProps = busqueda => {
    this.setState({ filtro: busqueda });
  };

  render() {
    return (
      <Query
        query={CLIENTES_QUERY}
        pollInterval={1000}
        variables={{
          limite: this.state.paginador.limite,
          offset: this.state.paginador.offset
        }}
      >
        {({ loading, error, data, startPolling, stopPolling }) => {
          if (loading) return "Cargando...!";
          if (error) return `Error : ${error}`;

          return (
            <Fragment>
              <h2 className="mt-2 text-center">Listados de Clientes</h2>
              <Buscador
                label={"Clientes"}
                handleChangeProps={this.handleChangeProps}
              />

              <ul className="list-group mt-4">
                {data.getClientes.map(cliente => {
                  const { id } = cliente;
                  if (
                    this.state.filtro.length === 0 ||
                    cliente.nombre.toLowerCase().search(this.state.filtro) >
                      -1 ||
                    cliente.apellido.toLowerCase().search(this.state.filtro) >
                      -1
                  ) {
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
                  }
                  return null;
                })}
              </ul>
              <Paginador
                limite={this.state.paginador.limite}
                pagActual={this.state.paginador.pagActual}
                totalClientes={data.totalClientes}
                paginaSiguiente={this.paginaSiguiente}
                paginaAnterior={this.paginaAnterior}
              />
            </Fragment>
          );
        }}
      </Query>
    );
  }
}

export default Clientes;
