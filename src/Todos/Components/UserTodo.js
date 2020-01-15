import React, { useState } from "react";

import Checkbox from "../../Shared/Components/FormElements/Checkbox";

import "./UserTodo.css";

const UserTodo = props => {
  return <Checkbox goal={props.title}></Checkbox>;
};

export default UserTodo;
