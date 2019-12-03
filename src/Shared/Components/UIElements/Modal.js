import React from "react";
import ReactDOM from "react-dom";

import Backdrop from "./Backdrop";
import "./Modal.css";

const Modal = props => {
  return (
    <React.Fragment>
      <Backdrop onClick={props.close} />
      <div className="modal">
        <div className="modal-container">
          <h2>Add a goal</h2>
          <div className="input-container">
            <input type="text" placeholder="Goal" className="modal-inputs" />
            <input
              type="textarea"
              placeholder="description"
              className="modal-inputs"
            />
            <input placeholder="deadline" className="modal-inputs" />
          </div>
          <button onClick={props.close}> close </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Modal;
