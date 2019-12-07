import React, { useState } from "react";

import "./UserTodo.css";
import "./PartnerTodo.css";
import Checkbox from "../../Shared/Components/FormElements/Checkbox";

const PartnerTodo = props => {
  let done = props.status;
  const [goalDeleted, setGoalDeleted] = useState(false);
  let fullGoal;
  fullGoal = (
    <li
      className={"todo-item " + (done ? "todo-complete" : null)}
      style={{ textDecorationLine: done ? "line-through" : null }}
    >
      <Checkbox name={props.description} />
      <p>{props.description}</p>
    </li>
  );

  return <div>{fullGoal}</div>;
};

export default PartnerTodo;
