import React, { useState, useEffect, useContext } from "react";
import { useHttpClient } from "../../Shared/Hooks/http-hook";

import UserList from "../Components/UserList";
import PartnerList from "../Components/PartnerList";
import UserActions from "../../Users/Components/UserActions";
import GoalHistory from "../../Users/Components/GoalHistory";
import LoadingSpinner from "../../Shared/Components/UIElements/LoadingSpinner";
import Button from "../../Shared/Components/UIElements/Button";
import Footer from "../../Shared/Pages/Footer";

import "./Dashboard.css";

import { AuthContext } from "../../Shared/context/auth-context";

const Dashboard = () => {
  const [loadedGoals, setloadedGoals] = useState();
  const [partnerGoals, setPartnerGoals] = useState();
  const [loadedActions, setLoadedActions] = useState();
  const { sendRequest, isLoading } = useHttpClient();
  const [updateGoals, setupdateGoals] = useState(false);

  const [partnerRequest, setPartnerRequest] = useState();
  const [refreshFlag, setRefreshFlag] = useState(false);

  const auth = useContext(AuthContext);
  console.log(auth);
  let user = auth.userId;

  const updateActionHandler = () => {
    setupdateGoals(prev => !prev);
  };

  const refreshActions = () => {
    setRefreshFlag(true);
  };

  // Fetch the users goals
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/${auth.userId}/goals`
        );

        setloadedGoals(responseData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchGoals();
    setRefreshFlag(false);
  }, [sendRequest, user, updateGoals, refreshFlag, auth.userId]);

  // Fetch the partners goals
  useEffect(() => {
    if (auth.partnerId) {
      const partnerGoals = async () => {
        try {
          const responseData = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/users/${auth.partnerId}/goals`
          );
          setPartnerGoals(responseData);
        } catch (err) {
          console.log(err);
        }
      };
      partnerGoals();
    }
  }, [auth.partnerId, sendRequest]);

  //Fetch the users action list
  useEffect(() => {
    const fetchActions = async () => {
      try {
        const actionData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/actions/${auth.userId}`
        );

        setLoadedActions(actionData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchActions();
    setRefreshFlag(false);
  }, [sendRequest, setLoadedActions, user, refreshFlag, auth.userId]);

  useEffect(() => {
    if (auth.partnerRequest) {
      setPartnerRequest(true);
    }
  }, [auth.partnerRequest]);

  const partnerResponseHandler = async response => {
    console.log(response);
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/${auth.userId}`,
        "PATCH",
        JSON.stringify({
          partnerId: auth.partnerRequest,
          response
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token
        }
      );
      setPartnerRequest(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="app-container">
      <h2>Stay accountable, with a friend.</h2>

      {/* Check for partner request */}
      {!isLoading && partnerRequest && (
        <div className="partner-request-container">
          <p>PERSONS_NAME has requested to partner with you. Do you accept?</p>
          <div className="partner-request-container--buttons">
            <Button onClick={() => partnerResponseHandler("ACCEPT")}>
              Accept
            </Button>
            <Button onClick={() => partnerResponseHandler("REJECT")}>
              Reject
            </Button>
          </div>
        </div>
      )}

      {isLoading && <LoadingSpinner asOverlay />}
      <div className="dashboard-container">
        <div className="leftside-container">
          {!isLoading && loadedGoals && (
            <UserList
              userId={auth.userId}
              goals={loadedGoals}
              update={updateActionHandler}
              username={auth.username}
              email={auth.userEmail}
              refresh={refreshActions}
            />
          )}

          {!isLoading && loadedGoals && (
            <div className="goalhistory-container">
              <GoalHistory userId={auth.userId} />
            </div>
          )}

          {/* {isLoading && <LoadingSpinner />} */}
        </div>
        <div className="rightside-container">
          {!isLoading && partnerGoals && (
            <PartnerList
              partner={auth.partnerName}
              userId={auth.userId}
              todos={partnerGoals}
              partnerConnected
              token={auth.token}
            />
          )}
          {!isLoading && !partnerGoals && (
            <PartnerList linkRequest={partnerRequest} />
          )}

          <div className="useraction-container">
            {!isLoading && loadedActions && (
              <UserActions
                refreshActions={refreshActions}
                actions={loadedActions}
              />
            )}
          </div>
        </div>
      </div>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
