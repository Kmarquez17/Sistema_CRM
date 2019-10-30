import React, { Component, Fragment } from "react";
import { Query } from "react-apollo";
import Select from "react-select";
import Animated from "react-select/animated";

import { CLIENTE_QUERY, PRODUCTOS_QUERY } from "../../queries/index";

import Spinner from "../../components/Spinner/Spinner";

const DatosClientes = ({ id }) => {
  return (
    <Fragment>
      <h3 className="text-center mb-3">Resumen del Cliente</h3>
      <Query query={CLIENTE_QUERY} variables={{ id }} pollInterval={500}>
        {({ loading, error, data, startPolling, stopPolling }) => {
          if (loading) return <Spinner />;
          const err = error
            ? error.graphQLErrors[0].message
            : "Cliente no existente...!";
          if (error || data.getCliente === null)
            return <h5 className="text-center">{err}</h5>;

          const {
            nombre,
            apellido,
            edad,
            emails,
            empresa,
            tipo
          } = data.getCliente;
          return (
            <ul className="list-unstyled my-5">
              <li className="border font-weight-bold p-2">
                Nombre:
                <span className="font-weight-normal"> {nombre}</span>
              </li>

              <li className="border font-weight-bold p-2">
                Apellido:
                <span className="font-weight-normal"> {apellido}</span>
              </li>

              <li className="border font-weight-bold p-2">
                Empresa:
                <span className="font-weight-normal"> {empresa}</span>
              </li>

              <li className="border font-weight-bold p-2">
                Emails:
                {emails.map((email, index) => (
                  <span key={index} className="font-weight-normal">
                    {" "}
                    {email.email}
                  </span>
                ))}
              </li>

              <li className="border font-weight-bold p-2">
                Edad:
                <span className="font-weight-normal"> {edad}</span>
              </li>

              <li className="border font-weight-bold p-2">
                Tipo:
                <span className="font-weight-normal"> {tipo}</span>
              </li>
            </ul>
          );
        }}
      </Query>
    </Fragment>
  );
};

class InventarioProductos extends Component {
  state = {
    productos: [],
    total: 0
  };

  handleChange = productos => {
    let productosAux = [];
    //Validamos que el producto no sea nulo, esto pasa cuando se elimina el ultimo producto
    if (productos !== null) {

      //Si no es nulo sacamos la ultima posicion que tiene nuestro arreglo de productos
      let posicion = productos.length;
      
      //Si es undefined es por que en el arreglo de objeto original no lleva el campo cantidad, automaticamente se 
      //agrega en cero
      if (productos[posicion - 1].cantidad === undefined) {
        productos[posicion - 1].cantidad = Number(0);
      }
      //En caso contrario el anterior objeto del arreglo de prodcuto ya tenia, entonces no se modifica
      console.log(productos);
      productosAux = productos;
    }
    this.setState(
      {
        productos: productosAux
      },
      () => {
        this.actualizarTotal();
      }
    );
  };

  /*Actualizamos el total de la cantidad de producto, esto puede pasa cuando se agregan o se eliminan */
  actualizarTotal = () => {
    let nuevoTotal = 0;

    //leer el state del producto
    let productos = this.state.productos;

    //cuando los productos estan en 0
    if (productos.length === 0) {
      this.setState({
        total: nuevoTotal
      });
      return;
    }

    //Realizar la operacion cantidad * precio
    productos.map(
      producto => (nuevoTotal += producto.cantidad * producto.precio)
    );

    this.setState({
      total: nuevoTotal
    });
  };

  actualizarStock = (cantidad, posicion) => {
    //leer el state del producto
    let productos = this.state.productos;

    //actualizar la cantidad del producto
    productos[posicion].cantidad = Number(cantidad);

    //validamos

    //agregamos al state
    this.setState(
      {
        productos
      },
      () => {
        this.actualizarTotal();
      }
    );
  };

  eliminarProducto = id => {
    //Sacamos el producto por su id
    const productos = this.state.productos.filter(
      producto => producto.id !== id
    );

    //Actualizamo el state con los productos restantes
    this.setState(
      {
        productos
      },
      () => {
        this.actualizarTotal();
      }
    );
  };
  render() {
    return (
      <Fragment>
        <Query query={PRODUCTOS_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <Spinner />;
            if (error) return `Error ${error}`;
            return (
              <Fragment>
                <h3 className="text-center">Seleccionar Artículos</h3>
                <Select
                  placeholder={"Seleccionar Productos"}
                  isMulti={true}
                  components={Animated()}
                  options={data.getProductos}
                  getOptionValue={options => options.id}
                  getOptionLabel={options => options.nombre}
                  value={this.state.productos}
                  onChange={this.handleChange}
                />

                {this.state.productos.length === 0 ? null : (
                  <Fragment>
                    <h5 className="text-center my-3">Resumen y Cantidades</h5>
                    <table className="table">
                      <thead className="bg-success text-light">
                        <tr className="font-weight-bold">
                          <th>Producto</th>
                          <th>Precio</th>
                          <th>Inventario</th>
                          <th>Cantidad</th>
                          <th>Eliminar</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.productos.map((producto, index) => {
                          return (
                            <Fragment key={index}>
                              <tr>
                                <td>{producto.nombre}</td>
                                <td>$ {producto.precio}</td>
                                <td>{producto.stock}</td>
                                <td>
                                  <input
                                    type="number"
                                    className="form-control"
                                    defaultValue="0"
                                    min="0"
                                    onChange={e =>
                                      this.actualizarStock(
                                        e.target.value,
                                        index
                                      )
                                    }
                                  />
                                </td>
                                <td>
                                  <button
                                    type="button"
                                    className="btn btn-danger font-weight-bold"
                                    onClick={e => {
                                      this.eliminarProducto(producto.id);
                                    }}
                                  >
                                    &times; Eliminar
                                  </button>
                                </td>
                              </tr>
                            </Fragment>
                          );
                        })}
                      </tbody>
                    </table>

                    <p className="font-weight-bold float-right mt-3">
                      Total:
                      <span className="font-weight-normal">
                        $ {this.state.total}
                      </span>
                    </p>
                  </Fragment>
                )}
              </Fragment>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}

class NuevosPedidos extends Component {
  render() {
    const { id } = this.props.match.params;
    return (
      <Fragment>
        <h1 className="text-center mb-5">Pedidos</h1>
        <div className="row">
          <div className="col-md-3">
            <DatosClientes id={id} />
          </div>
          <div className="col md-9">
            <InventarioProductos />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default NuevosPedidos;
