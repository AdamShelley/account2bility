// Component to render the header
import React from "react";

import NavLinks from "./NavLinks";
import "./NavHeader.css";

const NavHeader = () => {
  return (
    <div className="header-container">
      <h2 className="title">
        Account<span className="title-detail">2</span>bility
      </h2>
      <NavLinks />
    </div>
  );
};

export default NavHeader;
