import React from "react";

const UserTodo = props => {
  return (
    <div>
      <p>
        {props.id}: {props.description} -- {props.status ? "Completed" : null}
      </p>
    </div>
  );
};

export default UserTodo;
