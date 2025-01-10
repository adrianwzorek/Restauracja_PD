import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="error">
      <h1>Coś poszło nie tak</h1>
      <Link to="/">Powrót</Link>
    </div>
  );
};

export default Error;
