import React from "react";

import "./Checkbox.css";

const Checkbox = props => {
  return (
    <React.Fragment>
      <div className={`checkbox-input ${props.marked ? "marked" : null}`}>
        {!props.status ? (
          <label className="checkbox-label">
            <input type="checkbox" />
            <span className="checkbox-custom" onClick={props.onClick}></span>
          </label>
        ) : null}
        <p className={`checkbox-description `}>{props.goal}</p>
      </div>
    </React.Fragment>
  );
};

export default Checkbox;
