// Component to render the header links

import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";

import Button from "../UIElements/Button";
import "./NavLinks.css";

const NavLinks = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();

  const logoutHandler = () => {
    auth.logout();
    history.push("/auth");
  };

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
            <Button addedClass="logout-button" onClick={logoutHandler}>
              logout
            </Button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default NavLinks;
