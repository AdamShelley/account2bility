import React, { useContext } from "react";

import LoadingSpinner from "../../Shared/Components/UIElements/LoadingSpinner";
import Card from "../../Shared/Components/UIElements/Card";
import ActionItem from "./ActionItem";
import { AuthContext } from "../../Shared/context/auth-context";
import "./UserActions.css";

import { useHttpClient } from "../../Shared/Hooks/http-hook";

const UserActions = props => {
  const filteredActions = props.actions.actions.actions.filter(
    action => action.response === ""
  );
  const { isLoading, sendRequest } = useHttpClient();
  const auth = useContext(AuthContext);
  // Respond to clicks on accept + reject
  const actionResponseHandler = (action, response) => {
    // Fetch the route from the backend - PUT
    const sendActionResponse = async () => {
      try {
        await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/actions/${action._id}`,
          "PATCH",
          JSON.stringify({
            actionResponse: response,
            partnerId: auth.partnerId
          }),

          { "Content-Type": "application/json" }
        );

        props.refreshActions();
      } catch (err) {
        console.log(err);
      }
    };
    sendActionResponse();
  };

  return (
    <div className="action-container">
      <Card className="action-container__details">
        <h2>Action container</h2>
        <ul>
          {isLoading && <LoadingSpinner asOverlay />}
          {!isLoading &&
            filteredActions &&
            filteredActions.map((action, index) => {
              return (
                <ActionItem
                  key={index}
                  marked={action}
                  responseHandler={actionResponseHandler}
                />
              );
            })}
          {!isLoading && !filteredActions && (
            <p>Looks like you have no actions to oversee!</p>
          )}
        </ul>
      </Card>
    </div>
  );
};

export default UserActions;
