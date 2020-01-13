import React from "react";

import Card from "../../Shared/Components/UIElements/Card";
import ActionItem from "./ActionItem";
import "./UserActions.css";

const UserActions = props => {
  return (
    <div className="action-container">
      <Card className="action-container__details">
        <h2>Action container</h2>
        <ul>
          {props.actions.actions.actions.map((action, index) => {
            return <ActionItem key={index} marked={action} />;
          })}
        </ul>
      </Card>
    </div>
  );
};

export default UserActions;
