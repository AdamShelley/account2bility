import React from "react";

import Button from "../../Shared/Components/UIElements/Button";
import "./ActionItem.css";

const ActionItem = props => {
  const acceptHandler = event => {};

  const rejectHandler = event => {
    console.log("Rejected goal. Sent to DB");
  };

  return (
    <div className={`action-item action-item--`}>
      <div className="action-item--tools">
        <p></p>
        <div className="action-item--tools__buttons">
          <Button onClick={acceptHandler} addedClass="button--action-container">
            Accept
          </Button>
          <Button onClick={rejectHandler} addedClass="button--action-container">
            Reject
          </Button>
        </div>
      </div>
      <div className="action-item--item">
        <p>{props.marked.todoId.title}</p>
        <p>Request to {props.marked.action}</p>
      </div>
    </div>
  );
};

export default ActionItem;
