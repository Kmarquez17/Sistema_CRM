import React, { Fragment } from "react";
import PedidoCliente from "../../components/Pedidos/PedidoCliente";

const PedidosCliente = props => {
  const cliente = props.match.params.id;

  return (
    <Fragment>
      <h1 className="text-center mb-5">Pedidos del Cliente</h1>
      <div className="row">
        <PedidoCliente cliente={cliente} />
      </div>
    </Fragment>
  );
};

export default PedidosCliente;
