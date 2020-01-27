import React from "react";

import Button from "../../Shared/Components/UIElements/Button";

import "./UserTodo.css";

const UserTodo = props => {
  const acceptClicked = () => {
    props.responseHandler(props.id, "accept");
  };

  const rejectClicked = () => {
    props.responseHandler(props.id, "delete");
  };

  const goalClickedHandler = () => {
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
