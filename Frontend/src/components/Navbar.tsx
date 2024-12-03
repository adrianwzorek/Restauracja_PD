import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [link, setLink] = useState("/bill/");
  const [page, setPage] = useState("Your Bill");
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
      <Link to={link} className="link">
        {page}
      </Link>
    </nav>
  );
};

export default Navbar;
