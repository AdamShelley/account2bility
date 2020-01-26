// Component to render the header links

import React, { useState, useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";
import Modal from "../UIElements/Modal";
import Button from "../UIElements/Button";
import "./NavLinks.css";

const NavLinks = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const logoutHandler = () => {
    setShowLogoutModal(true);
  };

  const cancelLogoutHandler = () => {
    setShowLogoutModal(false);
  };

  const logoutConfirmed = () => {
    setShowLogoutModal(false);
    auth.logout();
    history.push("/auth");
  };

  return (
    <React.Fragment>
      <Modal
        show={showLogoutModal}
        onCancel={cancelLogoutHandler}
        header="Are you sure?"
        className="logout-modal"
        footerClass=""
        footer={
          <React.Fragment>
            <Button onClick={cancelLogoutHandler} inverse>
              CANCEL
            </Button>
            <Button onClick={logoutConfirmed}>Logout</Button>
          </React.Fragment>
        }
      >
        <p>Do you want to logout?</p>
      </Modal>

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
    </React.Fragment>
  );
};

export default NavLinks;
