import React from "react";

const Error = ({ error }) => {
  if (error.message) {
    error = error.message;
  }
  return <p className="alert alert-danger py-3 text-center my-3">{error}</p>;
};

export default Error;
