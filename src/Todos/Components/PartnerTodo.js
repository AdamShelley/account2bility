import React from "react";

import "./UserTodo.css";
import "./PartnerTodo.css";

const PartnerTodo = props => {
  return (
    <li className={`todo-item todo-item-${props.addedClass}`}>
      <p>{props.title}</p>
      <p>{props.proceed ? props.proceed : "Pending"}</p>
    </li>
  );
};

export default PartnerTodo;
