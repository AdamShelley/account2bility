import React, { useState, useEffect } from "react";

import HistoricalGoal from "./HistoricalGoal";
import Card from "../../Shared/Components/UIElements/Card";

import { useHttpClient } from "../../Shared/Hooks/http-hook";

import "./GoalHistory.css";
import LoadingSpinner from "../../Shared/Components/UIElements/LoadingSpinner";

const GoalHistory = props => {
  const { isLoading, sendRequest } = useHttpClient();
  const [historicalGoals, setHistoricalGoals] = useState();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const history = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/history/${props.userId}`
        );

        setHistoricalGoals(history);
      } catch (err) {
        console.log(err);
      }
    };
    fetchHistory();
  }, [props.userId, sendRequest]);

  return (
    <div className="history-container">
      <Card className="history-container__details">
        <h2>History container</h2>

        <p>
          This will store goals that have been completed (either deleted or
          otherwise).
        </p>
        {isLoading && <LoadingSpinner asOverlay />}
        {!isLoading && historicalGoals && (
          <ul>
            {historicalGoals.userHistory.map((goal, index) => {
              return (
                <HistoricalGoal
                  addedStyle={goal.proceed}
                  key={goal._id}
                  goal={goal}
                />
              );
            })}
          </ul>
        )}
      </Card>
    </div>
  );
};

export default GoalHistory;
