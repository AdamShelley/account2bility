import React, { useReducer, useCallback } from "react";

import Card from "../../Shared/Components/UIElements/Card";
import Input from "../../Shared/Components/FormElements/Input";

import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from "../util/validators";
import "./Auth.css";

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

const Auth = props => {
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

  return (
    <div className="auth-container">
      <Card className="login-card">
        <form
          onSubmit={
            props.onSubmit ? props.onSubmit : event => event.preventDefault()
          }
        >
          <h2>Login</h2>
          <Input
            id="email"
            type="email"
            element="input"
            label="Email"
            placeholder="Enter email"
            errorText="Please enter a valid email"
            validators={[VALIDATOR_EMAIL()]}
            onInput={inputHandler}
          />
          <Input
            id="password"
            type="password"
            element="input"
            label="Password"
            placeholder="Password"
            errorText="Please enter a valid password"
            validators={[VALIDATOR_MINLENGTH(5)]}
            onInput={inputHandler}
          />

          <button>LOGIN</button>
        </form>
      </Card>
    </div>
  );
};

export default Auth;
