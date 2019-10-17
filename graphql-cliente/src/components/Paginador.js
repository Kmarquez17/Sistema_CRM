import React, { Component } from "react";

class Paginador extends Component {
  state = {
    paginas: 0
  };

  static getDerivedStateFromProps(nextProps) {
    const { paginas, pagActual, paginacionReinicio } = nextProps;
    console.log("CANT", paginas);
    console.log("ACTUAL", pagActual);
    if (paginas < pagActual) {
      //Si la cantidad de paginas es menor a la actual, es por que se quedo en la ultima pagina por ende pasarlo
      // a la anterior
      paginacionReinicio(paginas);
    }

    return {
      paginas: paginas
    };
  }

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

    const { paginas } = this.state;
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
