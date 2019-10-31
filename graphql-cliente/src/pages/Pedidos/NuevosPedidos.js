import React, { Component, Fragment } from "react";
import InventarioProductos from "../../components/Pedidos/InventarioProductos";
import DatosCliente from "../../components/Pedidos/DatosCliente";
class NuevosPedidos extends Component {
  render() {
    const { id } = this.props.match.params;
    return (
      <Fragment>
        <h1 className="text-center mb-5">Pedidos</h1>
        <div className="row">
          <div className="col-md-3">
            <DatosCliente id={id} />
          </div>
          <div className="col md-9">
            <InventarioProductos idCliente={id} />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default NuevosPedidos;
