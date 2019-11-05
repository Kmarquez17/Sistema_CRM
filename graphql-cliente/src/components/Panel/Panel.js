import React, { Fragment } from "react";
import { Query } from "react-apollo";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

import { TOP_CLIENTES_PEDIDOS } from "../../queries";
import Spinner from "../Spinner";

const Panel = () => {
  return (
    <Fragment>
      <h1 className="text-center my-5">Top 10 Clientes que más compran</h1>
      <Query query={TOP_CLIENTES_PEDIDOS}>
        {({ loading, error, data }) => {
          if (loading) return <Spinner />;
          if (error) return `Error ${error.message}`;
          const topClienteGrafica = [];

          data.getTopClientes.map((pedido, index) => {
            topClienteGrafica[index] = {
              ...pedido.cliente[0],
              total: pedido.total
            };

            return topClienteGrafica
          });

          return (
            <BarChart
              width={1000}
              height={300}
              data={topClienteGrafica}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="nombre" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#82ca9d" />
            </BarChart>
          );
        }}
      </Query>
    </Fragment>
  );
};

export default Panel;
