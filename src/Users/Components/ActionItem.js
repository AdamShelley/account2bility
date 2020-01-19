import React from "react";

import Button from "../../Shared/Components/UIElements/Button";
import "./ActionItem.css";

const ActionItem = props => {
  console.log(props);
  const acceptHandler = event => {
    console.log("Accepted goal. Sent to DB");
  };

  const rejectHandler = event => {
    console.log("Rejected goal. Sent to DB");
  };

  return (
    <div className={`action-item action-item--`}>
      <div className="action-item--tools">
        <p></p>
        <div className="action-item--tools__buttons">
          <Button onClick={acceptHandler} addedClass="button-accept">
            Accept
          </Button>
          <Button onClick={rejectHandler} addedClass="button-reject">
            Reject
          </Button>
        </div>
      </div>
      <div className="action-item--item">
        <p className="action-item--goal">{props.marked.todoId.title}</p>
        <p className="action-item--info">Request to {props.marked.action}</p>
      </div>
    </div>
  );
};

export default ActionItem;
