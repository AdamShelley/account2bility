import React from "react";

import "./Checkbox.css";

const Checkbox = props => {
  return (
    <React.Fragment>
      <div className="checkbox-input">
        <label className="checkbox-label">
          <input type="checkbox" />
          <span className="checkbox-custom"></span>
        </label>
      </div>
      {/* <p className="checkbox-description">{props.name}</p> */}
    </React.Fragment>
  );
};

export default Checkbox;
