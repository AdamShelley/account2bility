import React, { useState, useEffect } from "react";
import { useHttpClient } from "../../Shared/Hooks/http-hook";

import UserList from "../Components/UserList";
import PartnerList from "../Components/PartnerList";
import UserActions from "../../Users/Components/UserActions";
import LoadingSpinner from "../../Shared/Components/UIElements/LoadingSpinner";

import "./Dashboard.css";

const username = "Adam";

const partner = "Sam";
const PARTNER_DUMMY = [
  {
    id: "todo1",
    description: "Eat Noodles",
    creator: "Sam",
    status: false,
    deadline: "31st December",
    marked: {
      value: true,
      type: "completed",
      decision: "pending"
    }
  },
  {
    id: "todo2",
    description: "Read",
    creator: "Sam",
    status: false,
    deadline: "21st December",
    marked: {
      value: false,
      type: null,
      decision: null
    }
  }
];

const Dashboard = () => {
  const [loadedGoals, setloadedGoals] = useState();
  const [partnerGoals, setPartnerGoals] = useState();
  const [loadedActions, setLoadedActions] = useState();
  const { sendRequest, isLoading } = useHttpClient();
  const [updateGoals, setupdateGoals] = useState(false);

  let user = "5e1b58475f1d5e2795c786f8";
  let partner = "5e1b58435f1d5e2795c786f7";

  const updateActionHandler = () => {
    console.log("called!");
    setupdateGoals(!updateGoals);
  };

  // Fetch the users goals
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:3000/api/v1/users/${user}/goals`
        );
        setloadedGoals(responseData);
      } catch (err) {}
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
            username={username}
            actions={loadedGoals}
            update={updateActionHandler}
          />
        )}
        {!isLoading && partnerGoals && (
          <PartnerList partner={partner} todos={partnerGoals} />
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
