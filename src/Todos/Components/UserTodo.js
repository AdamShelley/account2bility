import React from "react";

import Button from "../../Shared/Components/UIElements/Button";

import "./UserTodo.css";

const UserTodo = props => {
  const acceptClicked = e => {
    e.stopPropagation();
    props.responseHandler(props.id, "accept");
  };

  const rejectClicked = e => {
    e.stopPropagation();
    props.responseHandler(props.id, "delete");
  };

  const goalClickedHandler = e => {
    props.clicked(props.id);
  };

  return (
    <li
      onClick={goalClickedHandler}
      className={`todo-item todo-item-${props.addedStyle}`}
    >
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
        <p>{props.decision}</p>
      )}
    </li>
  );
};

export default UserTodo;
