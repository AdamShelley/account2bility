import React, { useState } from "react";

import "./UserTodo.css";
import "./PartnerTodo.css";
import { spawn } from "child_process";

const PartnerTodo = props => {
  let done = props.status;
  const [goalDeleted, setGoalDeleted] = useState(false);
  let fullGoal;
  fullGoal = (
    <li
      className={"todo-item " + (done ? "todo-complete" : null)}
      style={{ textDecorationLine: done ? "line-through" : null }}
    >
      <input type="checkbox" />
      <p>{props.description}</p>
    </li>
  );

  return <div>{fullGoal}</div>;
};

export default PartnerTodo;
