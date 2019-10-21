import React, { Component } from "react";

class FormularioProductos extends Component {
  state = {};

  /**validaForm: esta funcion sirve para validar que todos los input del
   * formulario esten completamente llenos
   */
  validaForm = () => {
    const { nombre, precio, stock } = this.props.producto;
    const noValido = !nombre || !precio || !stock;
    return noValido;
  };
  render() {
    const { nombre, precio, stock } = this.props.producto;
    return (
      <div className="row justify-content-center">
        <form className="col-md-8" onSubmit={this.props.handleSubmit}>
          <div className="form-group">
            <label>Nombre:</label>
            <input
              type="text"
              name="nombre"
              className="form-control"
              placeholder="Nombre del Producto"
              onChange={this.props.handleChange}
              value={nombre}
            />
          </div>
          <div className="form-group">
            <label>Precio:</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <div className="input-group-text">$</div>
              </div>
              <input
                type="number"
                name="precio"
                className="form-control"
                placeholder="Precio del Producto"
                onChange={this.props.handleChange}
                value={precio}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Stock:</label>
            <input
              type="number"
              name="stock"
              className="form-control"
              placeholder="stock del Producto"
              onChange={this.props.handleChange}
              value={stock}
            />
          </div>
          <button
            disabled={this.validaForm()}
            type="submit"
            className="btn btn-success float-right"
          >
            Guardar Cambios
          </button>
        </form>
      </div>
    );
  }
}

export default FormularioProductos;
