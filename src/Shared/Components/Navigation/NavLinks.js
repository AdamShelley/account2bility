// Component to render the header links

import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";

import "./NavLinks.css";

const NavLinks = () => {
  const auth = useContext(AuthContext);

  return (
    <div>
      <ul className="nav-links">
        {auth.isLoggedIn && (
          <li className="nav-link">
            <NavLink to="/" exact>
              dashboard
            </NavLink>
          </li>
        )}
        {auth.isLoggedIn && (
          <li className="nav-link">
            <NavLink to="/account">account</NavLink>
          </li>
        )}
        {!auth.isLoggedIn && (
          <li className="nav-link">
            <NavLink to="/auth">LOGIN</NavLink>
          </li>
        )}
        {auth.isLoggedIn && (
          <li className="nav-link">
            <NavLink to="/auth">LOGOUT</NavLink>
          </li>
        )}
      </ul>
    </div>
  );
};

export default NavLinks;
