import React from "react";

import Input from "../../Shared/Components/FormElements/Input";
import { VALIDATOR_REQUIRE } from "../../Shared/util/validators";

const NewGoal = () => {
  return (
    <form className="addGoal-form">
      <Input
        type="text"
        element="input"
        title="Goal"
        placeholder="Goal to add"
        errorText="Please enter a valid goal"
        validators={[VALIDATOR_REQUIRE()]}
      />
    </form>
  );
};

export default NewGoal;
