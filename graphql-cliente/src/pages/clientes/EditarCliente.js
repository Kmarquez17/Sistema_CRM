import React, { Component, Fragment } from "react";
import { Query, Mutation } from "react-apollo";

import { CLIENTE_QUERY } from "../../queries/index";
import { ACTUALIZAR_CLIENTE } from "../../mutations/index";

import FrmClientes from "../../components/Formularios/FrmClientes";

class Cliente extends Component {
  state = {
    cliente: this.props.cliente,
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

  handleSubmit = (e, actualizarCliente) => {
    e.preventDefault();
    //Sacamos el state para crear el input
    const {
      id,
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
      id,
      nombre,
      apellido,
      empresa,
      emails,
      edad: edadInt,
      tipo
    };

    //Invocamos el el mutation y pasamos el input
    actualizarCliente({ variables: { input } });
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
      <Mutation
        mutation={ACTUALIZAR_CLIENTE}
        onCompleted={() =>
          this.props.refetch().then(() => {
            this.props.history.push("/clientes");
          })
        }
      >
        {actualizarCliente => (
          <FrmClientes
            handleSubmit={e => {
              this.handleSubmit(e, actualizarCliente);
            }}
            handleChange={this.handleChange}
            handleChangeEmails={this.handleChangeEmails}
            handleNuevoCampo={this.handleNuevoCampo}
            handleEliminarCampo={this.handleEliminarCampo}
            cliente={this.state.cliente}
            // accionMutation={actualizarCliente}
          />
        )}
      </Mutation>
    );
  }
}

//Se encapsula el
// const FormularioRouter = withRouter(Formulario);

class EditarCliente extends Component {
  render() {
    //Tomar el ID, al cliente a editar
    const { id } = this.props.match.params;
    return (
      <Fragment>
        <h2 className="text-center">Editar Cliente</h2>
        <Query query={CLIENTE_QUERY} variables={{ id }}>
          {({ loading, error, data, refetch }) => {
            if (loading) return "Cargando...!";
            const err = error
              ? error.graphQLErrors[0].message
              : "Cliente no existente...!";
            if (error || data.getCliente === null)
              return <h5 className="text-center">{err}</h5>;

            return (
              <Cliente
                cliente={data.getCliente}
                history={this.props.history}
                refetch={refetch}
              />
            );
          }}
        </Query>
      </Fragment>
    );
  }
}

export default EditarCliente;
