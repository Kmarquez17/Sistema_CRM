import React, { Component, Fragment } from "react";
import { Query, Mutation } from "react-apollo";
import { Link } from "react-router-dom";

import { CLIENTES_QUERY } from "../../queries";
import { ELIMINAR_CLIENTE } from "../../mutations";

import Exito from "../../components/Alertas/Exito";
import Paginador from "../../components/Paginador";
import Buscador from "../../components/Buscador";

const initialState = {
  mostrar: false,
  mensaje: ""
};

class Clientes extends Component {
  state = {
    paginador: {
      limite: 10,
      pagActual: 1,
      offset: 0
    },
    filtro: "",
    alerta: {
      ...initialState
    }
  };

  paginaSigAnt = accion => {
    let resultado, pagActual;
    debugger;
    if (accion) {
      resultado = this.state.paginador.offset + this.state.paginador.limite;
      pagActual = this.state.paginador.pagActual + 1;
    } else {
      resultado = this.state.paginador.offset - this.state.paginador.limite;
      pagActual = this.state.paginador.pagActual - 1;
    }

    this.setState({
      paginador: {
        ...this.state.paginador,
        offset: resultado,
        pagActual: pagActual
      },
      filtro: ""
    });
  };

  paginacionReinicio = pagActual => {
    this.setState({
      paginador: {
        ...this.state.paginador,
        offset: this.state.paginador.offset - this.state.paginador.limite,
        pagActual: pagActual
      }
    });
  };

  handleChangeProps = busqueda => {
    this.setState({ filtro: busqueda });
  };

  render() {
    const {
      alerta: { mensaje, mostrar }
    } = this.state;
    
    let alerta = mostrar ? <Exito mensaje={mensaje} /> : null;
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
          let cantidadPag = Math.ceil(
            Number(data.totalClientes) / this.state.paginador.limite
          );
          let paginaActual =
            cantidadPag > 0 ? this.state.paginador.pagActual : 0;
          return (
            <Fragment>
              <h2 className="mt-2 text-center">Listados de Clientes</h2>
              {alerta}
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
                            <Mutation
                              mutation={ELIMINAR_CLIENTE}
                              onCompleted={data => {
                                this.setState(
                                  {
                                    alerta: {
                                      mostrar: true,
                                      mensaje: data.eliminarCliente
                                    }
                                  },
                                  () => {
                                    setTimeout(() => {
                                      this.setState({
                                        alerta: {
                                          ...initialState
                                        }
                                      });
                                    }, 3000);
                                  }
                                );
                              }}
                            >
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
                              to={`/clientes/editar/${id}`}
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
                pagActual={paginaActual}
                paginas={cantidadPag}
                paginaSigAnt={this.paginaSigAnt}
                paginacionReinicio={this.paginacionReinicio}
              />
            </Fragment>
          );
        }}
      </Query>
    );
  }
}

export default Clientes;
