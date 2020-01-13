import React, { useState } from "react";

import UserCheck from "../../Shared/Components/FormElements/UserCheck";
import "./UserTodo.css";

const UserTodo = props => {
  // Check username matches the creator, if it does -> Do not render checkbox
  // const username = "Adam";
  // const partnerName = "Sam";
  let done = props.status;
  const [goalDeleted, setGoalDeleted] = useState(false);

  const deleteUserGoal = () => {
    setGoalDeleted(true);
    return deletedVersion;
  };

  let fullGoal;
  fullGoal = (
    <React.Fragment>
      <li>
        <UserCheck title={props.title} />
      </li>
      {/* <li
        className={"todo-item " + (done ? "todo-complete" : null)}
        style={{ textDecorationLine: done ? "line-through" : null }}
      >
        <p>{props.title}</p>
        {!done ? (
          <span onClick={deleteUserGoal} className="cancel-icon">
            Delete
          </span>
        ) : null}
      </li> */}
    </React.Fragment>
  );

  const deletedVersion = (
    <div className="deleted-goal">
      <li className="todo-item deleted-item">
        <p className="goal">{props.description}</p>
        <p className="delete-text">{`Goal sent to partner to confirm deletion.`}</p>
      </li>
    </div>
  );

  return (
    <React.Fragment>{!goalDeleted ? fullGoal : deletedVersion}</React.Fragment>
  );
};

export default UserTodo;
