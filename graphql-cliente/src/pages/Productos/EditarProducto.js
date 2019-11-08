import React, { Component, Fragment } from "react";
import { Query, Mutation } from "react-apollo";
import { PRODUCTO_QUERY } from "../../queries";
import FrmProductos from "../../components/Formularios/FrmProductos";
import { ACTUALIZAR_PRODUCTO } from "../../mutations";
import Spinner from "../../components/Spinner";

const initialState = {
  nombre: "",
  precio: "",
  stock: ""
};

class Producto extends Component {
  state = {
    producto: this.props.producto
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

  handleSubmit = (e, actualizarProducto) => {
    e.preventDefault();
    //Insertamos en la base de datos
    actualizarProducto().then(data => {
      this.limpiarState();
    });
  };

  render() {
    const { id, nombre, precio, stock } = this.state.producto;
    const input = {
      id,
      nombre,
      precio: Number(precio),
      stock: Number(stock)
    };
    return (
      <Mutation
        mutation={ACTUALIZAR_PRODUCTO}
        variables={{ input }}
        onCompleted={() =>
          this.props.refetch().then(() => {
            this.props.history.push("/productos");
          })
        }
      >
        {(actualizarProducto, { loading, error }) => {
          if (loading) return <Spinner />;
          if (error) return `Error ${error}`;
          return (
            <FrmProductos
              handleChange={this.handleChange}
              handleSubmit={e => {
                this.handleSubmit(e, actualizarProducto);
              }}
              producto={this.state.producto}
            />
          );
        }}
      </Mutation>
    );
  }
}
class Productos extends Component {
  state = {
    producto: { ...initialState }
  };
  render() {
    //Tomar el ID, al producto a editar
    const { id } = this.props.match.params;
    return (
      <Fragment>
        <h1 className="text-center">Editar Producto</h1>
        <Query query={PRODUCTO_QUERY} variables={{ id }}>
          {({ loading, error, data, refetch }) => {
            if (loading) return <Spinner />;
            if (error) return `Error ${error}`;
            return (
              <Producto
                producto={data.getProducto}
                history={this.props.history}
                refetch={refetch}
              />
            );
          }}
        </Query>
      </Fragment>
    );
  }
}

export default Productos;
