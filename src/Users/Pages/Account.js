import React, { useContext } from "react";

import Card from "../../Shared/Components/UIElements/Card";
import Button from "../../Shared/Components/UIElements/Button";
import { AuthContext } from "../../Shared/context/auth-context";
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
  console.log(props);
  const auth = useContext(AuthContext);

  return (
    <div className="account-container">
      <Card className="account-container--card">
        <h2>Account Settings</h2>
        <p>This page is WIP - functionality not included yet</p>
        <div className="account-container--details">
          <div className="user-details">
            <img src={auth.userImage} alt="user" />
            <p className="user-details--name">{auth.username}</p>
          </div>
          <div className="partner-details">
            <img src={partnerpic} alt="Partner img" />
            <p>{auth.partnerName}</p>
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
