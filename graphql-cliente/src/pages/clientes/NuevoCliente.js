import React, { Component, Fragment } from "react";
import { Mutation } from "react-apollo";

import { CREAR_CLIENTE } from "../../mutations/index";

import FrmClientes from "../../components/Formularios/FrmClientes";
class NuevoCliente extends Component {
  state = {
    cliente: {
      nombre: "",
      apellido: "",
      empresa: "",
      emails: [],
      edad: "",
      tipo: ""
    },
    error: false
  };

  /**handleChange capturamos los datos ingresados por el usuario */
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      cliente: {
        ...this.state.cliente,
        [name]: value
      }
    });
  };

  /**handleChangeEmails capturamos solo los correos ingresado por el usuario */
  handleChangeEmails = (i, e) => {
    const { name, value } = e;

    const nuevosEmails = this.state.cliente.emails.map((email, index) => {
      if (i !== index) return email;
      return {
        ...email,
        [name]: value
      };
    });

    this.setState({
      cliente: {
        ...this.state.cliente,
        emails: nuevosEmails
      }
    });
  };

  handleSubmit = (e, crearCliente) => {
    e.preventDefault();
    //Sacamos el state para crear el input
    const {
      nombre,
      apellido,
      empresa,
      emails,
      edad,
      tipo
    } = this.state.cliente;

    //Validamos los emails tambien
    let emailVacio = true;
    emails.forEach(data => {
      if (data.email.trim() === "") {
        emailVacio = false;
        return;
      }
    });

    // Validamos que los campos ingresados por el usuario no sean vacios
    let edadInt = Number(edad);
    if (
      nombre.trim() === "" ||
      apellido.trim() === "" ||
      empresa.trim() === "" ||
      edadInt <= 0 ||
      tipo.trim() === "" ||
      emailVacio === false
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
      emails,
      edad: edadInt,
      tipo
    };

    //Invocamos el el mutation y pasamos el input
    crearCliente({ variables: { input } });
  };

  /**handleNuevoCampo agrega mas emails al data*/
  handleNuevoCampo = () => {
    this.setState({
      cliente: {
        ...this.state.cliente,
        emails: this.state.cliente.emails.concat([{ email: "" }])
      }
    });
  };

  /** handleEliminarCampo elimina emails al data */
  handleEliminarCampo = i => {
    this.setState({
      cliente: {
        ...this.state.cliente,
        emails: this.state.cliente.emails.filter((email, index) => i !== index)
      }
    });
  };

  render() {
    return (
      <Fragment>
        <h2 className="text-center">Nuevo Cliente</h2>

        <Mutation
          mutation={CREAR_CLIENTE}
          //Redireccionamos a la pagina del listado de clientes
          onCompleted={() => this.props.history.push("/")}
        >
          {(crearCliente, { loading, error }) => {
            if (loading) return "Cargando...!";
            if (error) return `Error ${error}`;
            return (
              <FrmClientes
                handleSubmit={e => {
                  this.handleSubmit(e, crearCliente);
                }}
                handleChange={this.handleChange}
                handleChangeEmails={this.handleChangeEmails}
                handleNuevoCampo={this.handleNuevoCampo}
                handleEliminarCampo={this.handleEliminarCampo}
                cliente={this.state.cliente}
                // accionMutation={crearCliente}
                error={this.state.error}
              />
            );
          }}
        </Mutation>
      </Fragment>
    );
  }
}

export default NuevoCliente;
