import React from "react";
import { NavLink } from "react-router-dom";
import "../css/navbar.css";
const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "active link" : "link")}
      >
        Głowna
      </NavLink>
      <NavLink
        to="/dishes/"
        className={({ isActive }) => (isActive ? "active link" : "link")}
      >
        Dania
      </NavLink>
      <NavLink
        to="/drinks/"
        className={({ isActive }) => (isActive ? "active link" : "link")}
      >
        Napoje
      </NavLink>
      <NavLink
        to="/bill/"
        className={({ isActive }) => (isActive ? "active link" : "link")}
      >
        Rachunek
      </NavLink>
      <NavLink
        to="/login/"
        className={({ isActive }) => (isActive ? "active link" : "link")}
      >
        Admin
      </NavLink>
    </nav>
  );
};

export default Navbar;
