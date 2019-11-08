import React, { Component, Fragment } from "react";
import { Mutation } from "react-apollo";

import { CREAR_USUARIO } from "../../mutations";

import Spinner from "../../components/Spinner";
import Error from "../../components/Alertas/Error";

const initialState = {
  usuario: "",
  password: "",
  repetirPassword: "",
  nombre: "",
  rol: ""
};
class Registro extends Component {
  state = {
    ...initialState
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  validarForm = () => {
    const { usuario, nombre, password, rol, repetirPassword } = this.state;

    const noValido =
      !usuario || !nombre || !password || !rol || password !== repetirPassword;

    return noValido;
  };

  handleSubmit = (e, crearUsuario) => {
    e.preventDefault();

    crearUsuario().then(data => {
      this.setState({
        ...initialState
      });

      //Redireccionamos al loging
      this.props.history.push("/login");
    });
  };

  render() {
    const { usuario, nombre, password, rol, repetirPassword } = this.state;
    return (
      <Fragment>
        <h1 className="text-center mb-5">Nuevo Usuario</h1>
        <div className="row  justify-content-center">
          <Mutation mutation={CREAR_USUARIO} variables={{ usuario, nombre, password, rol }}>
            {(crearUsuario, { loading, error, data }) => {
              if (loading) return <Spinner />;

              return (
                <form
                  className="col-md-8"
                  onSubmit={e => {
                    this.handleSubmit(e, crearUsuario);
                  }}
                >
                  {error && <Error error={error} />}
                  <div className="form-group">
                    <label>Usuario</label>
                    <input
                      onChange={this.handleChange}
                      type="text"
                      name="usuario"
                      className="form-control"
                      placeholder="Nombre Usuario"
                      value={usuario}
                    />
                    <small className="form-text text-muted">
                      (Sin espacios y sin caracteres especales)
                    </small>
                  </div>
                  <div className="form-group">
                    <label>Nombre</label>
                    <input
                      onChange={this.handleChange}
                      type="text"
                      name="nombre"
                      className="form-control"
                      placeholder="Nombre completo"
                      value={nombre}
                    />
                    <small className="form-text text-muted">
                      (Agrega Nombres y Apellidos)
                    </small>
                  </div>

                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label>Password</label>
                      <input
                        onChange={this.handleChange}
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Password"
                        value={password}
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label>Repetir Password</label>
                      <input
                        onChange={this.handleChange}
                        type="password"
                        name="repetirPassword"
                        className="form-control"
                        placeholder="Repetir Password"
                        value={repetirPassword}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Rol: </label>
                    <select
                      className="form-control"
                      value={rol}
                      name="rol"
                      onChange={this.handleChange}
                    >
                      <option value="">Elegir...</option>
                      <option value="ADMINISTRADOR">ADMINISTRADOR</option>
                      <option value="VENDEDOR">VENDEDOR</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    disabled={this.validarForm()}
                    className="btn btn-success float-right"
                  >
                    Crear Usuario
                  </button>
                </form>
              );
            }}
          </Mutation>
        </div>
      </Fragment>
    );
  }
}

export default Registro;
