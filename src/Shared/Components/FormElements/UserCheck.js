import React from "react";

import "./UserCheck.css";

const userCheck = props => {
  return (
    <div>
      <input type="checkbox" id="checkbox" className="checkbox" />
      <label htmlFor="checkbox" className="label"></label>
      {props.title}
    </div>
  );
};

export default userCheck;
