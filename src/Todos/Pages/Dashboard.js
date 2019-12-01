import React from "react";

import UserList from "../Components/UserList";
import PartnerList from "../Components/PartnerList";

import "./Dashboard.css";

const TODO_DUMMY = [
  {
    id: "todo1",
    description: "Work out",
    creator: "Adam",
    status: true
  },
  {
    id: "todo2",
    description: "Meditate",
    creator: "Sam",
    status: false
  }
];

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h2>This is the dashboard</h2>
      <div className="todo-container">
        <UserList todos={TODO_DUMMY} />
        <PartnerList />
      </div>
    </div>
  );
};

export default Dashboard;
