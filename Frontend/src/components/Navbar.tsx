import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="link">
        Home
      </Link>
      <Link to="/dishes/" className="link">
        Dishes
      </Link>
      <Link to="/drinks/" className="link">
        Drinks
      </Link>
      <Link to="/login/" className="link">
        Create a Bill
      </Link>
    </nav>
  );
};

export default Navbar;
