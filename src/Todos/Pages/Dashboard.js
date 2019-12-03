import React from "react";

import UserList from "../Components/UserList";
import PartnerList from "../Components/PartnerList";

import "./Dashboard.css";

const username = "Adam";
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
    creator: "Adam",
    status: false
  }
];

const partner = "Sam";
const PARTNER_DUMMY = [
  {
    id: "todo1",
    description: "Eat Noodles",
    creator: "Sam",
    status: true
  },
  {
    id: "todo2",
    description: "Read",
    creator: "Sam",
    status: false
  }
];

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <div className="todo-container">
        <UserList username={username} todos={TODO_DUMMY} />
        <PartnerList partner={partner} todos={PARTNER_DUMMY} />
      </div>
    </div>
  );
};

export default Dashboard;
