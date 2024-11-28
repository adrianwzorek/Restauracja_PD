import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>Oh noooooo!</h1>
      <h2>This site is not found :(</h2>
      <Link to="/">Go back</Link>
    </div>
  );
};

export default NotFound;
