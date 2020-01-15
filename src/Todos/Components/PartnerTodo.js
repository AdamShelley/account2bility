import React, { useState, useEffect } from "react";

import "./UserTodo.css";
import "./PartnerTodo.css";

const PartnerTodo = props => {
  return <li className={props.status ? "goal-done" : ""}>{props.title}</li>;
};

export default PartnerTodo;
