import React, { Component } from "react";

class Paginador extends Component {
  state = {
    paginador: {
      paginas: Math.ceil(Number(this.props.totalClientes) / this.props.limite)
    }
  };

  render() {
    const { pagActual } = this.props;

    const btnAnterior =
      pagActual > 1 ? (
        <button
          type="button"
          className="btn btn-success mr-2"
          onClick={this.props.paginaAnterior}
        >
          &laquo; Anterior
        </button>
      ) : null;

    const { paginas } = this.state.paginador;
    const btnSiguiente =
      pagActual !== paginas ? (
        <button
          type="button"
          className="btn btn-success"
          onClick={this.props.paginaSiguiente}
        >
          Siguiente &raquo;
        </button>
      ) : null;

    return (
      <div className="mt-5 d-flex justify-content-center">
        {btnAnterior}
        {btnSiguiente}
      </div>
    );
  }
}

export default Paginador;
