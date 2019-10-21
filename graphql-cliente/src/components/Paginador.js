import React, { Component } from "react";

class Paginador extends Component {
  state = {
    paginas: 0
  };

  static getDerivedStateFromProps(nextProps) {
    const { paginas, pagActual, paginacionReinicio } = nextProps;
    // console.log("CANT", paginas);
    // console.log("ACTUAL", pagActual);
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
          onClick={() => {
            //Si es false es la anterior pagina
            this.props.paginaSigAnt(false);
          }}
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
          onClick={() => {
            //Si es true es la siguiente pagina
            this.props.paginaSigAnt(true); 
          }}
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
