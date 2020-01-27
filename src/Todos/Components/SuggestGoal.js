import React, { useState, useContext } from "react";

// import Input from "../../Shared/Components/FormElements/Input";
// import Backdrop from "../../Shared/Components/UIElements/Backdrop";
import Button from "../../Shared/Components/UIElements/Button";
import { useHttpClient } from "../../Shared/Hooks/http-hook";
import { AuthContext } from "../../Shared/context/auth-context";
import "./SuggestGoal.css";

const SuggestGoal = props => {
  const [suggestBox, setSuggestBox] = useState();
  const { isLoading, sendRequest } = useHttpClient();
  const auth = useContext(AuthContext);

  const suggestGoalHandler = async () => {
    console.log("suggest clicked");
    console.log(suggestBox);

    // Send a post request to suggest a goal to the partner
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/actions/suggest`,
        "POST",
        JSON.stringify({
          userId: auth.userId,
          partnerId: auth.partnerId,
          suggestion: suggestBox
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token
        }
      );
    } catch (err) {}

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
