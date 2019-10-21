import React, { Component, Fragment } from "react";

class FormularioClientes extends Component {
  render() {
    //Capturamos el error y verificar que no se haya activado, en la validacion de los campos
    const error = this.props.error;
    let respuesta = error ? (
      <p className="alert alert-danger p-3 text-center">
        Llenar todos los campos ya que son obligatorios
      </p>
    ) : null;

    return (
      <Fragment>
        {respuesta}

        <div className="row justify-content-center">
          <form
            className="col-md-8 m-3"
            onSubmit={this.props.handleSubmit}
            /*onSubmit={e => {
              e.preventDefault();
              this.props.handleSubmit(this.props.accionMutation);
            }}*/
          >
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre"
                  name="nombre"
                  value={this.props.cliente.nombre}
                  onChange={this.props.handleChange}
                />
              </div>
              <div className="form-group col-md-6">
                <label>Apellido</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Apellido"
                  name="apellido"
                  value={this.props.cliente.apellido}
                  onChange={this.props.handleChange}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-12">
                <label>Empresa</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Empresa"
                  name="empresa"
                  value={this.props.cliente.empresa}
                  onChange={this.props.handleChange}
                />
              </div>
            </div>

            {this.props.cliente.emails.map((input, index) => (
              <div key={index} className="form-row">
                <div className="form-group col-md-12">
                  <label>Correo: {index + 1}</label>
                  <div className="input-group">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      name="email"
                      value={this.props.cliente.emails[index].email}
                      onChange={e => {
                        this.props.handleChangeEmails(index, e.target);
                      }}
                    />
                    <div className="input-group-append">
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => {
                          this.props.handleEliminarCampo(index);
                        }}
                      >
                        &times; Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="form-group d-flex justify-content-center col-md-12">
              <button
                type="button"
                className="btn btn-warning"
                onClick={this.props.handleNuevoCampo}
              >
                + Agregar Email
              </button>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Edad</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Edad"
                  name="edad"
                  value={this.props.cliente.edad}
                  onChange={this.props.handleChange}
                />
              </div>
              <div className="form-group col-md-6">
                <label>Tipo Cliente</label>
                <select
                  className="form-control"
                  name="tipo"
                  value={this.props.cliente.tipo}
                  onChange={this.props.handleChange}
                >
                  <option value="">Elegir...</option>
                  <option value="PREMIUM">PREMIUM</option>
                  <option value="BASICO">BÁSICO</option>
                </select>
              </div>
            </div>
            <button type="submit" className="btn btn-success float-right">
              Guardar Cambios
            </button>
          </form>
        </div>
      </Fragment>
    );
  }
}

export default FormularioClientes;
