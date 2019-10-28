import React, { Component, Fragment } from "react";
import { Query } from "react-apollo";
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

const InventarioProductos = () => {
  return (
    <Fragment>
      <Query query={PRODUCTOS_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <Spinner />;
          if (error) return `Error ${error}`;
          console.log(data);
          return <h3>Inventario de los Productos</h3>;
        }}
      </Query>
    </Fragment>
  );
};

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
