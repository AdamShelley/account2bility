// Component to render the header links

import React from "react";
import { NavLink } from "react-router-dom";

import "./NavLinks.css";

const NavLinks = () => {
  let login = true;

  return (
    <div>
      <ul className="nav-links">
        <li className="nav-link">
          <NavLink to="/" exact>
            dashboard
          </NavLink>
        </li>
        <li className="nav-link">
          <NavLink to="/account">account</NavLink>
        </li>
        <li className="nav-link">
          <NavLink to="/auth">{login ? "login" : "logout"}</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default NavLinks;
