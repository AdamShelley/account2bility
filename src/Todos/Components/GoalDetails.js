import React from "react";

import "./GoalDetails.css";

const GoalDetails = props => {
  return (
    <div className="modal__goal-details">
      <h2>{props.details.goal.title}</h2>
      <div className="modal__goal-details--info">
        <p className="modal__goal-details--info--description">
          Description: {props.details.goal.description}
        </p>
        <p className="modal__goal-details--info--deadline">
          Deadline: {props.details.goal.deadline}
        </p>
        <p className="modal__goal-details--info--status">
          {props.details.goal.status === true ? "Submitted" : "In progress"}
        </p>
      </div>
    </div>
  );
};

export default GoalDetails;
