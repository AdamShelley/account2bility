import React from "react";

import Card from "../../Shared/Components/UIElements/Card";
import Button from "../../Shared/Components/UIElements/Button";

import userpic from "../../img/user.jpg";
import partnerpic from "../../img/partner.jpg";

import "./Account.css";

const Account = props => {
  return (
    <div className="account-container">
      <Card className="account-container--card">
        <h2>Account Settings</h2>

        <div className="account-container--details">
          <div className="user-details">
            <img src={userpic} alt="user-image" />
            <p>User name</p>
            <p>Email Address</p>
          </div>
          <div className="partner-details">
            <img src={partnerpic} alt="Partner img" />
            <p>Partners name</p>
          </div>
        </div>
        <div className="account-buttons">
          <Button>DEACTIVATE ACCOUNT</Button>
          <Button>Remove partner link</Button>
        </div>
      </Card>
    </div>
  );
};

export default Account;
