import React, { Component, Fragment } from "react";
import { Mutation, Query } from "react-apollo";
import Select from "react-select";
import Animated from "react-select/animated";


import { PRODUCTOS_QUERY } from "../../queries/index";
import { CREAR_PEDIDO } from "../../mutations/index";

import Spinner from "../../components/Spinner";
import Error from "../../components/Alertas/Error";


class InventarioProductos extends Component {
  state = {
    productos: [],
    total: 0
  };

  handleChange = productos => {
    let productosAux = [];
    //Validamos que el producto no sea nulo, esto pasa cuando se elimina el ultimo producto
    if (productos !== null) {
      if (productos.length !== 0) {
        //Si no es nulo sacamos la ultima posicion que tiene nuestro arreglo de productos
        let posicion = productos.length;

        console.log(posicion);

        //Si es undefined es por que en el arreglo de objeto original no lleva el campo cantidad, automaticamente se
        //agrega en cero
        if (productos[posicion - 1].cantidad === undefined) {
          productos[posicion - 1].cantidad = Number(1);
        }
        //En caso contrario el anterior objeto del arreglo de prodcuto ya tenia, entonces no se modifica
        productosAux = productos;
      }
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

  eliminarProducto = (id, posicion) => {
    //Cuando se elimina un producto se resetea la cantidad
    const auxProd = this.state.productos;
    delete auxProd[posicion].cantidad;
    console.log(auxProd);

    this.setState({ productos: auxProd });

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
    const mensaje =
      this.state.total < 0 ? (
        <Error mensaje="Las cantidades de los productos no pueden ser negativas" />
      ) : null;
    return (
      <Fragment>
        <Query
          query={PRODUCTOS_QUERY}
          pollInterval={100}
          variables={{
            stock: true
          }}
        >
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
                    {mensaje}
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
                                    defaultValue="1"
                                    min="1"
                                    onChange={e => {
                                      //Validamos que el valor puesto en el input no sea mayor al stock y cantidades menores
                                      if (e.target.value > producto.stock) {
                                        e.target.value = 0;
                                      }
                                      this.actualizarStock(
                                        e.target.value,
                                        index
                                      );
                                    }}
                                  />
                                </td>
                                <td>
                                  <button
                                    type="button"
                                    className="btn btn-danger font-weight-bold"
                                    onClick={e => {
                                      this.eliminarProducto(producto.id, index);
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

                    {/* Se activara el boton hasta que haya un total mayor a cero */}
                    {this.state.total > 0 ? (
                      <Mutation mutation={CREAR_PEDIDO}>
                        {crearPedido => (
                          <button
                            type="button"
                            className="btn btn-warning mt-4"
                            onClick={e => {
                              const productosInput = this.state.productos.map(
                                ({ nombre, precio, stock, ...objeto }) => objeto
                              );

                              console.log(productosInput);
                              const input = {
                                pedido: productosInput,
                                total: this.state.total,
                                cliente: this.props.idCliente
                              };

                              crearPedido({ variables: { input } });
                            }}
                          >
                            Generar Pedidos
                          </button>
                        )}
                      </Mutation>
                    ) : null}
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

export default InventarioProductos;
