import React, { Component, Fragment } from "react";
import { CREAR_CLIENTE } from "../mutations/index";
import { Mutation } from "react-apollo";
class NuevoCliente extends Component {
  state = {
    cliente: {
      nombre: "",
      apellido: "",
      empresa: "",
      edad: "",
      email: "",
      tipo: ""
    },
    error: false
  };
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      cliente: {
        ...this.state.cliente,
        [name]: value
      }
    });
  };

  handleSubmit = crearCliente => {
    //Sacamos el state para crear el input
    const { nombre, apellido, empresa, email, edad, tipo } = this.state.cliente;

    // Validamos que los campos ingresados por el usuario no sean vacios
    if (
      nombre.trim() === "" ||
      apellido.trim() === "" ||
      empresa.trim() === "" ||
      email.trim() === "" ||
      edad.trim() === "" ||
      tipo.trim() === ""
    ) {
      this.setState({ error: true });
      return;
    }

    this.setState({ error: false });

    //Creamos el objeto input, para mandarlo al mutation y hacer la
    // operacion de crear cliente
    const input = {
      nombre,
      apellido,
      empresa,
      email,
      edad: Number(edad),
      tipo
    };

    //Invocamos el el mutation y pasamos el input
    crearCliente({ variables: { input } });
  };

  render() {
    //Capturamos el error y verificar que no se haya activado, en la validacion de los campos
    const { error } = this.state;
    let respuesta = error ? (
      <p className="alert alert-danger p-3 text-center">
        Llenar todos los campos ya que son obligatorios
      </p>
    ) : null;

    return (
      <Fragment>
        <h2 className="text-center">Nuevo Clientes</h2>
        {respuesta}
        <div className="row justify-content-center">
          <Mutation
            mutation={CREAR_CLIENTE}
            //Redireccionamos a la pagina del listado de clientes
            onCompleted={() => this.props.history.push("/")}
          >
            {crearCliente => (
              <form
                className="col-md-8 m-3"
                onSubmit={e => {
                  e.preventDefault();
                  this.handleSubmit(crearCliente);
                }}
              >
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Nombre</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nombre"
                      name="nombre"
                      value={this.state.cliente.nombre}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Apellido</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Apellido"
                      name="apellido"
                      value={this.state.cliente.apellido}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Empresa</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Empresa"
                      name="empresa"
                      value={this.state.cliente.empresa}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      name="email"
                      value={this.state.cliente.email}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Edad</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Edad"
                      name="edad"
                      value={this.state.cliente.edad}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Tipo Cliente</label>
                    <select
                      className="form-control"
                      name="tipo"
                      value={this.state.cliente.tipo}
                      onChange={this.handleChange}
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
            )}
          </Mutation>
        </div>
      </Fragment>
    );
  }
}

export default NuevoCliente;
