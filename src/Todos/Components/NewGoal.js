import React, { useCallback, useReducer } from "react";

import LoadingSpinner from "../../Shared/Components/UIElements/LoadingSpinner";

import Input from "../../Shared/Components/FormElements/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from "../../Shared/util/validators";
import { useHttpClient } from "../../Shared/Hooks/http-hook";
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
      },
      deadline: {
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

  const { sendRequest, isLoading } = useHttpClient();

  const goalSubmitHandler = async event => {
    event.preventDefault();

    try {
      await sendRequest(
        "http://localhost:3000/api/v1/users/newgoal",
        "POST",
        JSON.stringify({
          title: formState.inputs.goal.value,
          description: formState.inputs.description.value,
          deadline: formState.inputs.deadline.value,
          status: false,
          creator: "test@gmail.com"
        }),
        { "Content-Type": "application/json" }
      );
    } catch (err) {}

    props.closeModal();
    props.updateHandler();
  };

  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner asOverlay />}
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
          label="Description"
          placeholder="Briefly describe your goal.."
          errorText="Please enter a valid description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          onInput={inputHandler}
        />
        <Input
          id="deadline"
          element="input"
          label="Deadline"
          placeholder="Complete this goal by..."
          errorText="Please enter a valid date"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
        />

        <button
          className="addgoal-button"
          type="submit"
          disabled={!formState.isValid}
        >
          Add the goal
        </button>
      </form>
    </React.Fragment>
  );
};

export default NewGoal;
