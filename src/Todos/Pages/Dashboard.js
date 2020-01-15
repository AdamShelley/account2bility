import React, { useState, useEffect, useContext } from "react";
import { useHttpClient } from "../../Shared/Hooks/http-hook";

import UserList from "../Components/UserList";
import PartnerList from "../Components/PartnerList";
import UserActions from "../../Users/Components/UserActions";
import LoadingSpinner from "../../Shared/Components/UIElements/LoadingSpinner";

import "./Dashboard.css";

import { AuthContext } from "../../Shared/context/auth-context";

const Dashboard = () => {
  const [loadedGoals, setloadedGoals] = useState();
  const [partnerGoals, setPartnerGoals] = useState();
  const [loadedActions, setLoadedActions] = useState();
  const { sendRequest, isLoading } = useHttpClient();
  const [updateGoals, setupdateGoals] = useState(false);
  const auth = useContext(AuthContext);

  // let user = "5e1b58475f1d5e2795c786f8";
  let user = auth.userId;
  // let partnerName = auth.partnerName;
  let partner = "5e1b58435f1d5e2795c786f7";

  const updateActionHandler = () => {
    console.log("called!");
    setupdateGoals(prev => !prev);
  };

  // Fetch the users goals
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:3000/api/v1/users/${user}/goals`
        );

        // console.log(responseData);
        setloadedGoals(responseData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchGoals();
  }, [sendRequest, user, updateGoals]);

  // Fetch the partners goals
  useEffect(() => {
    const partnerGoals = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:3000/api/v1/users/${partner}/goals`
        );
        setPartnerGoals(responseData);
      } catch (err) {
        console.log(err);
      }
    };
    partnerGoals();
  }, [partner, sendRequest]);

  //Fetch the users action list
  useEffect(() => {
    const fetchActions = async () => {
      try {
        const actionData = await sendRequest(
          `http://localhost:3000/api/v1/actions/${user}`
        );
        setLoadedActions(actionData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchActions();
  }, [sendRequest, setLoadedActions, user]);

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>

      <div className="todo-container">
        {!isLoading && loadedGoals && (
          <UserList
            userId={auth.userId}
            actions={loadedGoals}
            update={updateActionHandler}
            username={auth.username}
            email={auth.userEmail}
          />
        )}
        {!isLoading && partnerGoals && (
          <PartnerList partner={auth.partnerName} todos={partnerGoals} />
        )}
        {isLoading && <LoadingSpinner />}
      </div>
      <div className="useraction-container">
        {!isLoading && loadedActions && <UserActions actions={loadedActions} />}
      </div>
    </div>
  );
};

export default Dashboard;
