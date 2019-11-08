import React, { Component, Fragment } from "react";
import { Mutation } from "react-apollo";

import { CREAR_PRODUCTO } from "../../mutations";
import FrmProductos from "../../components/Formularios/FrmProductos";
import Spinner from "../../components/Spinner";

const initialState = {
  nombre: "",
  precio: "",
  stock: ""
};

class Productos extends Component {
  state = {
    producto: { ...initialState }
  };

  limpiarState = () => {
    this.setState({
      producto: {
        ...initialState
      }
    });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      producto: { ...this.state.producto, [name]: value }
    });
  };

  handleSubmit = (e, crearProducto) => {
    e.preventDefault();
    //Insertamos en la base de datos
    crearProducto().then(data => {
      this.limpiarState();
    });
  };

  render() {
    const { nombre, precio, stock } = this.state.producto;
    const input = {
      nombre,
      precio: Number(precio),
      stock: Number(stock)
    };
    return (
      <Fragment>
        <h2 className="text-center mb-5">Nuevo Producto</h2>
        <Mutation
          mutation={CREAR_PRODUCTO}
          variables={{ input }}
          onCompleted={() => this.props.history.push("/productos")}
        >
          {(crearProducto, { loading, error }) => {
            if (loading) return <Spinner />;
            if (error) return `Error ${error}`;
            return (
              <FrmProductos
                handleChange={this.handleChange}
                handleSubmit={e => {
                  this.handleSubmit(e, crearProducto);
                }}
                producto={this.state.producto}
              />
            );
          }}
        </Mutation>
      </Fragment>
    );
  }
}

export default Productos;
