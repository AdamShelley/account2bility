import React from "react";

import "./PartnerList.css";

const PartnerList = props => {
  const username = props.partner;
  return (
    <div className="partnerlist-container">
      <h2> {username}'s List</h2>
      <div className="partnerlist__list">
        <li>test</li>
        <li>test</li>
      </div>
    </div>
  );
};

export default PartnerList;
