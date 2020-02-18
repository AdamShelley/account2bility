import React from "react";

import "./UserTodo.css";
import "./PartnerTodo.css";

const PartnerTodo = props => {
  return (
    <li className={`todo-item todo-item-partner todo-item-${props.addedClass}`}>
      <p>{props.title}</p>
      <p>{props.addedClass === "goal-pending" ? "Pending" : "In progress"}</p>
    </li>
  );
};

export default PartnerTodo;
