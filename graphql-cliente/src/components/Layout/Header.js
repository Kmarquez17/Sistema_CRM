import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import CerrarSesion from "./CerrarSesion";

const Header = ({ session }) => {
  const { getUsuario } = session;

  let NavBar = getUsuario ? <NavegationAuth /> : <NavegationNoAuth />;
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between d-flex mb-4">
      <div className="container">{NavBar}</div>
    </nav>
  );
};

const NavegationAuth = () => {
  return (
    <Fragment>
      <Link to="/clientes" className="navbar-brand text-light font-weight-bold">
        CRM
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navegacion"
        aria-controls="navegacion"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navegacion">
        <ul className="navbar-nav ml-auto text-right">
          <li className="nav-item dropdown mr-md-2 mb-2 mb-md-0">
            <button
              className="nav-link dropdown-toggle btn btn-block btn-success"
              data-toggle="dropdown"
            >
              Clientes
            </button>
            <div className="dropdown-menu " aria-labelledby="navegacion">
              <Link to="/clientes" className="dropdown-item">
                Ver Clientes
              </Link>
              <Link to="/clientes/nuevo" className="dropdown-item">
                Nuevo Clientes
              </Link>
            </div>
          </li>
          <li className="nav-item dropdown">
            <button
              className="nav-link dropdown-toggle btn btn-block btn-success"
              data-toggle="dropdown"
            >
              Productos
            </button>
            <div className="dropdown-menu" aria-labelledby="navegacion">
              <Link to="/productos" className="dropdown-item">
                Ver Productos
              </Link>
              <Link to="/productos/nuevo" className="dropdown-item">
                Nuevo Productos
              </Link>
            </div>
          </li>
          <CerrarSesion />
        </ul>
      </div>
    </Fragment>
  );
};

const NavegationNoAuth = () => {
  return (
    <h3 to="/" className="navbar-brand text-light font-weight-bold">
      CRM
    </h3>
  );
};
export default Header;
