import React from "react";

const DellateProducto = ({ cantidad, producto }) => {
  return (
    <div className="border mb-4 p-2">
      <p className="card-text font-weight-bold">
        Nombre Producto:
        <span className="font-weight-normal"> {producto.nombre}</span>
      </p>
      <p className="card-text font-weight-bold">
        Cantidad:
        <span className="font-weight-normal"> {cantidad}</span>
      </p>
      <p className="card-text font-weight-bold">
        Precio:
        <span className="font-weight-normal">$ {producto.precio}</span>
      </p>
    </div>
  );
};

export default DellateProducto;
