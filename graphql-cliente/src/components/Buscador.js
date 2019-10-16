import React from "react";

const Buscador = ({ handleChangeProps, label }) => {
  const handleChange = e => {
    e.preventDefault();
    const { value } = e.target;

    handleChangeProps(value.toLowerCase());
  };

  return (
    <div className="row d-flex justify-content-end">
      <div className="col-lg-3">
        <div className="form-group">
          <input
            type="search"
            className="form-control"
            onChange={handleChange}
            placeholder={`Buscar ${label}`}
          />
        </div>
      </div>
    </div>
  );
};

export default Buscador;
