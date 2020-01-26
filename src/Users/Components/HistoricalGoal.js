import React from "react";

import "./HistoricalGoal.css";

const HistoricalGoal = props => {
  return (
    <div>
      <li className={`todo-item todo-item-goal-${props.addedStyle}ed`}>
        <p>{props.goal.title}</p>
        <p>
          {props.goal.proceed === "accept"
            ? "Goal Accepted - Good job!"
            : "Goal Rejected"}
        </p>
      </li>
    </div>
  );
};

export default HistoricalGoal;
