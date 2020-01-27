import React, { useState } from "react";

// import Input from "../../Shared/Components/FormElements/Input";
// import Backdrop from "../../Shared/Components/UIElements/Backdrop";
import Button from "../../Shared/Components/UIElements/Button";

import "./SuggestGoal.css";

const SuggestGoal = props => {
  const [suggestBox, setSuggestBox] = useState();

  const suggestGoalHandler = () => {
    console.log("suggest clicked");
    console.log(suggestBox);

    // Send a post request to suggest a goal to the partner

    props.closeModal();
  };

  return (
    <div className="suggestion__tab--container">
      <h2>Suggest a goal to partner</h2>
      <div className="suggestion__tab">
        <input
          onInput={e => setSuggestBox(e.target.value)}
          placeholder="Suggest"
        />
        <Button
          onClick={suggestGoalHandler}
          addedClass="button-accept button-suggest"
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default SuggestGoal;
