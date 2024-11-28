import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/dishes/">Dishes</Link>
      <Link to="/drinks/">Drinks</Link>
      <Link to="/login/">Create a Bill</Link>
    </nav>
  );
};

export default Navbar;
