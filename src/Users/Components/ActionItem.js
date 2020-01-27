import React from "react";

import Button from "../../Shared/Components/UIElements/Button";
import "./ActionItem.css";

const ActionItem = props => {
  const suggestionThankHandler = () => {
    // DELETE the action
  };

  if (props.marked.suggestion) {
    return (
      <div className="action-item suggested-item">
        <div className="suggested-item__left">
          <Button onClick={suggestionThankHandler} addedClass="button-accept">
            Thanks!
          </Button>
          <p>Your partner has suggested you add: </p>
        </div>

        <p className="suggested-item__suggestion">{props.marked.suggestion}</p>
      </div>
    );
  }

  const actionRequest = props.marked.action === "accept" ? "accept" : "delete";

  const acceptResponseHandler = event => {
    props.responseHandler(props.marked, "accept");
  };

  const rejectResponseHandler = event => {
    props.responseHandler(props.marked, "reject");
  };

  return (
    <div
      className={`action-item action-item ${
        props.marked.action === "accept"
          ? "accept-requested"
          : "delete-requested"
      }`}
    >
      <div className="action-item--tools">
        <p></p>
        <div className="action-item--tools__buttons">
          <Button onClick={acceptResponseHandler} addedClass="button-accept">
            Accept
          </Button>
          <Button onClick={rejectResponseHandler} addedClass="button-reject">
            Reject
          </Button>
        </div>
      </div>
      <div className={`action-item--item`}>
        <p className="action-item--goal">{props.marked.todoId.title}</p>
        <p
          className={`action-item--info action-item--info--${props.marked.action}`}
        >
          Request to {actionRequest}
        </p>
      </div>
    </div>
  );
};

export default ActionItem;
