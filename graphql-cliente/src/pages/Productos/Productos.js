import React, { Component, Fragment } from "react";
import { Query, Mutation } from "react-apollo";
import { Link } from "react-router-dom";

import { PRODUCTOS_QUERY } from "../../queries";
import { ELIMINAR_PRODUCTO } from "../../mutations";

import Exito from "../../components/Alertas/Exito";
import Paginador from "../../components/Paginador";

const initialState = {
  mostrar: false,
  mensaje: ""
};

class Productos extends Component {
  state = {
    paginador: {
      limite: 10,
      pagActual: 1,
      offset: 0
    },
    alerta: {
      ...initialState
    }
  };

  paginaSigAnt = accion => {
    let resultado, pagActual;
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
  render() {
    const {
      alerta: { mensaje, mostrar }
    } = this.state;

    let alerta = mostrar ? <Exito mensaje={mensaje} /> : null;

    return (
      <Query
        query={PRODUCTOS_QUERY}
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
            Number(data.totalProductos) / this.state.paginador.limite
          );
          let paginaActual =
            cantidadPag > 0 ? this.state.paginador.pagActual : 0;
            
          return (
            <Fragment>
              <h1 className="text-center mb-5">Listado de productos</h1>
              {alerta}
              <table className="table table-striped">
                <thead>
                  <tr className="table-primary">
                    <th scope="col">Nombre</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Stock</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {data.getProductos.map(producto => {
                    const { id } = producto;
                    return (
                      <tr key={id}>
                        <td>{producto.nombre}</td>
                        <td>{producto.precio}</td>
                        <td>{producto.stock}</td>
                        <td>
                          <Mutation
                            mutation={ELIMINAR_PRODUCTO}
                            onCompleted={data => {
                              this.setState(
                                {
                                  alerta: {
                                    mostrar: true,
                                    mensaje: data.eliminarProducto
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
                            {eliminarProducto => (
                              <button
                                type="button"
                                className="btn btn-danger mr-2"
                                onClick={() => {
                                  if (
                                    window.confirm(
                                      "Seguro que deseas eliminar este producto?"
                                    )
                                  ) {
                                    eliminarProducto({ variables: { id } });
                                  }
                                }}
                              >
                                &times; Eliminar
                              </button>
                            )}
                          </Mutation>

                          <Link
                            to={`/productos/editar/${id}`}
                            className="btn btn-success"
                          >
                            Editar
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

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

export default Productos;
