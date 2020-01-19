import React, { useState } from "react";

import Button from "../../Shared/Components/UIElements/Button";

import "./UserTodo.css";

const UserTodo = props => {
  const acceptClicked = () => {
    console.log("accept Clicked");
    props.responseHandler(props.id, "accept");
  };

  const rejectClicked = () => {
    console.log("accept Clicked");
    props.responseHandler(props.id, "reject");
  };

  return (
    <li className={`todo-item todo-item-${props.addedClass}`}>
      <p>{props.title}</p>
      {!props.status ? (
        <React.Fragment>
          <Button
            onClick={acceptClicked}
            size="small"
            addedClass="button-accept"
          >
            done
          </Button>
          <Button
            onClick={rejectClicked}
            size="small"
            danger
            addedClass="button-reject"
          >
            delete
          </Button>{" "}
        </React.Fragment>
      ) : (
        <p>"Pending..."</p>
      )}
    </li>
  );
};

export default UserTodo;
