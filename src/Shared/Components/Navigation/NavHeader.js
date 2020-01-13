// Component to render the header
import React from "react";
import { Link } from "react-router-dom";

import NavLinks from "./NavLinks";
import "./NavHeader.css";

const NavHeader = () => {
  return (
    <div className="header-container">
      <h2 className="title">
        <Link className="logo" to="/">
          Account<span className="title-detail">2</span>bility
        </Link>
      </h2>
      <NavLinks />
    </div>
  );
};

export default NavHeader;
