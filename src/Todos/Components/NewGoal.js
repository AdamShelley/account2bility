import React, { useCallback, useReducer } from "react";

import Input from "../../Shared/Components/FormElements/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from "../../Shared/util/validators";
import "./NewGoal.css";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: {
            value: action.value,
            isValid: action.isValid
          }
        },
        isValid: formIsValid
      };
    default:
      return state;
  }
};

const NewGoal = props => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      goal: {
        value: "",
        isValid: false
      },
      description: {
        value: "",
        isValid: false
      }
    },
    isValid: false
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      value: value,
      isValid: isValid,
      inputId: id
    });
  }, []);

  const goalSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  return (
    <form className="addGoal-form" onSubmit={goalSubmitHandler}>
      <Input
        id="goal"
        type="text"
        element="input"
        label="Goal"
        placeholder="Goal to add"
        errorText="Please enter a valid goal"
        validators={[VALIDATOR_REQUIRE()]}
        onInput={inputHandler}
      />
      <Input
        id="description"
        element="textarea"
        label="description"
        placeholder="Briefly describe your goal.."
        errorText="Please enter a valid description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        onInput={inputHandler}
      />
      <Input
        id="deadline"
        element="input"
        label="deadline"
        placeholder="Complete this goal by..."
        errorText="Please enter a valid date"
        validators={[VALIDATOR_REQUIRE()]}
        onInput={inputHandler}
      />

      <button
        className="addgoal-button"
        type="submit"
        disabled={!formState.isValid}
        onClick={props.closeModal}
      >
        Add the goal
      </button>
    </form>
  );
};

export default NewGoal;
