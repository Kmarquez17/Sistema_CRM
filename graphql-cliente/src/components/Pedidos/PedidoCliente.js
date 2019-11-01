import React from "react";
import { Query, Mutation } from "react-apollo";

import { PRODUCTO_QUERY, PEDIDOS_CLIENTE_QUERY } from "../../queries";
import { ACTUALIZAR_ESTADO_PEDIDO } from "../../mutations";

import Spinner from "../Spinner";
import DetalleProducto from "./DetalleProducto";

const PedidosCliente = props => {
  const { cliente } = props;

  return (
    <Query
      query={PEDIDOS_CLIENTE_QUERY}
      variables={{ cliente }}
      pollInterval={500}
    >
      {({ error, loading, data, startPolling, stopPolling }) => {
        if (loading) return <Spinner />;
        if (error) return `Error ${error.message}`;
        if (data.getPedidosCliente.length === 0) {
          return (
            <h5 className="col-md-12 text-center">
              No hay pedidos asociado al cliente
            </h5>
          );
        }
        return data.getPedidosCliente.map((pedido, index) => {
          let fecha = new Date(Number(pedido.fecha));
          const id = pedido.id;

          let color = "";
          if (pedido.estado === "PENDIENTE") {
            color = "border-primary";
          } else if (pedido.estado === "COMPLETADO") {
            color = "border-success";
          } else {
            color = "border-danger";
          }

          return (
            <div className="col-md-4" key={id + index}>
              <div className={`card ${color} mb-3`}>
                <div className="card-body">
                  <p className="card-text font-weight-bold ">
                    Estado:
                    <Mutation mutation={ACTUALIZAR_ESTADO_PEDIDO}>
                      {actualizarEstado => (
                        <select
                          className="form-control my-3"
                          value={pedido.estado}
                          onChange={e => {
                            const input = {
                              id,
                              pedido: pedido.pedido,
                              total: pedido.total,
                              fecha: pedido.fecha,
                              cliente,
                              estado: e.target.value
                            };
                            actualizarEstado({ variables: { input } });
                          }}
                        >
                          <option value="PENDIENTE">PENDIENTE</option>
                          <option value="COMPLETADO">COMPLETADO</option>
                          <option value="ANULADO">ANULADO</option>
                        </select>
                      )}
                    </Mutation>
                  </p>
                  <p className="card-text font-weight-bold">
                    Pedido ID:
                    <span className="font-weight-normal"> {pedido.id}</span>
                  </p>
                  <p className="card-text font-weight-bold">
                    Fecha Pedido:
                    <span className="font-weight-normal">
                      {fecha.toLocaleString("es")}
                    </span>
                  </p>
                  <p className="card-text font-weight-bold">
                    Total:
                    <span className="font-weight-normal">$ {pedido.total}</span>
                  </p>

                  <h4 className="card-text text-center mb-3">
                    Artículos del pedido
                  </h4>
                  {pedido.pedido.map((producto, index) => {
                    const { id, cantidad } = producto;
                    return (
                      <Query key={id} query={PRODUCTO_QUERY} variables={{ id }}>
                        {({ error, loading, data }) => {
                          if (loading) return <Spinner />;
                          if (error) return `Error ${error.message}`;
                          console.log(data);
                          return (
                            <DetalleProducto
                              key={id}
                              producto={data.getProducto}
                              cantidad={cantidad}
                            />
                          );
                        }}
                      </Query>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        });
      }}
    </Query>
  );
};

export default PedidosCliente;
