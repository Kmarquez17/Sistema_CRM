import React, { Component, Fragment } from "react";
import { Mutation } from "react-apollo";
import { withRouter } from "react-router-dom";

import { LOGIN } from "../../mutations";

import Error from "../../components/Alertas/Error";

const initialState = {
  usuario: "",
  password: ""
};

class Login extends Component {
  state = {
    ...initialState
  };

  actualizarState = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  };

  limpiarState = () => {
    this.setState({ ...initialState });
  };

  iniciarSesion = (e, autentificarUsuario) => {
    e.preventDefault();

    autentificarUsuario().then(async ({ data }) => {
      //Guardamos el token en el localStorage
      localStorage.setItem("token", data.autentificarUsuario.token);

      //Ejecutar el query despues de iniciar sesion
      await this.props.refetch();

      //Liminar el state
      this.limpiarState();

      //Redireccionar
      this.props.history.push("/panel");
      
    });
  };

  validarForm = () => {
    const { usuario, password } = this.state;

    const noValido = !usuario || !password;

    return noValido;
  };
  render() {
    const { usuario, password } = this.state;

    return (
      <Fragment>
        <h1 className="text-center mb-5">Iniciar Sesión</h1>
        <div className="row  justify-content-center">
          <Mutation mutation={LOGIN} variables={{ usuario, password }}>
            {(autentificarUsuario, { loading, error, data }) => {
              return (
                <form
                  onSubmit={e => this.iniciarSesion(e, autentificarUsuario)}
                  className="col-md-8"
                >
                  {error && <Error error={error} />}

                  <div className="form-group">
                    <label>Usuario</label>
                    <input
                      onChange={this.actualizarState}
                      value={usuario}
                      type="text"
                      name="usuario"
                      className="form-control"
                      placeholder="Nombre Usuario"
                    />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      onChange={this.actualizarState}
                      value={password}
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Password"
                    />
                  </div>

                  <button
                    disabled={loading || this.validarForm()}
                    type="submit"
                    className="btn btn-success float-right"
                  >
                    Iniciar Sesión
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

export default withRouter(Login);
