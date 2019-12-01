// Component to render the header links

import React from "react";
import { NavLink } from "react-router-dom";

import "./NavLinks.css";

const NavLinks = () => {
  return (
    <div>
      <ul className="nav-links">
        <li className="nav-link">
          <NavLink to="/" exact>
            Dashboard
          </NavLink>
        </li>
        <li className="nav-link">
          <NavLink to="/account">Account</NavLink>
        </li>
        <li className="nav-link">
          <NavLink to="/auth">LOGIN/LOGOUT</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default NavLinks;
