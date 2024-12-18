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
        Home
      </NavLink>
      <NavLink
        to="/dishes/"
        className={({ isActive }) => (isActive ? "active link" : "link")}
      >
        Dishes
      </NavLink>
      <NavLink
        to="/drinks/"
        className={({ isActive }) => (isActive ? "active link" : "link")}
      >
        Drinks
      </NavLink>
      <NavLink
        to="/bill/"
        className={({ isActive }) => (isActive ? "active link" : "link")}
      >
        Bill
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
