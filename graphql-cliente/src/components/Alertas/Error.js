import React from "react";

const Error = ({ mensaje }) => {
  return <p className="alert alert-danger py-3 text-center my-3">{mensaje}</p>;
};

export default Error;
