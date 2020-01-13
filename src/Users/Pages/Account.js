import React from "react";

import Card from "../../Shared/Components/UIElements/Card";
import Button from "../../Shared/Components/UIElements/Button";

import userpic from "../../img/user.jpg";
import partnerpic from "../../img/partner.jpg";

import "./Account.css";

const deleteAccountHandler = () => {
  console.log("Are you sure modal?");
  console.log("....deleting account");
};

const delinkAccountHandler = () => {
  console.log("Are you sure modal?");
  console.log("....delinking partner");
};

const Account = props => {
  return (
    <div className="account-container">
      <Card className="account-container--card">
        <h2>Account Settings</h2>

        <div className="account-container--details">
          <div className="user-details">
            <img src={userpic} alt="user" />
            <p>{props.username}</p>
            <p>{props.email}</p>
          </div>
          <div className="partner-details">
            <img src={partnerpic} alt="Partner img" />
            <p>{props.partnername}</p>
          </div>
        </div>
        <div className="account-buttons">
          <Button
            onClick={deleteAccountHandler}
            inverse
            addedClass="button--deactivate"
          >
            Deactivate account
          </Button>
          <Button
            onClick={delinkAccountHandler}
            inverse
            addedClass="button--delink"
          >
            Remove partner link
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Account;
