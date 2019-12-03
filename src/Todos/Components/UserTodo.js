import React, { useState } from "react";

import "./UserTodo.css";

const UserTodo = props => {
  const [checkboxChecked, setCheckboxChecked] = useState(false);

  const handleCheckClick = () => {
    if (!checkboxChecked) {
      setCheckboxChecked(true);
    } else {
      setCheckboxChecked(false);
    }
  };
  // Check username matches the creator, if it does -> Do not render checkbox
  const username = "Adam";
  return (
    <li className="todo-item">
      {props.description} -- {props.status ? "Completed" : null}
    </li>
  );
};

export default UserTodo;
