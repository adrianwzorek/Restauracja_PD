import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>Coś poszło nie tak :(</h1>
      <h2>Nie znaleziono strony</h2>
      <Link to="/">Powrót</Link>
    </div>
  );
};

export default NotFound;
