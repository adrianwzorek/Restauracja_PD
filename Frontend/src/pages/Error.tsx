import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div>
      <h1>Error page</h1>
      <h2>Something goes wrong</h2>
      <Link to="/">Go back</Link>
    </div>
  );
};

export default Error;
