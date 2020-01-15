import React, { useState, useReducer, useCallback, useContext } from "react";

import { useHistory } from "react-router-dom";

import Card from "../../Shared/Components/UIElements/Card";
import Input from "../../Shared/Components/FormElements/Input";
import Button from "../../Shared/Components/UIElements/Button";

import { AuthContext } from "../../Shared/context/auth-context";
import { useHttpClient } from "../Hooks/http-hook";

import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from "../util/validators";
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
  const { sendRequest, isLoading } = useHttpClient();
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);

  const history = useHistory();

  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      name: {
        value: "",
        isValid: false
      },
      email: {
        value: "",
        isValid: false
      },
      password: {
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

  const switchToSignUp = e => {
    e.preventDefault();
    setIsLoginMode(prev => !prev);
  };

  const authSubmitHandler = async e => {
    e.preventDefault();

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          `http://localhost:3000/api/v1/users/login`,
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          }),
          { "Content-Type": "application/json" }
        );
        auth.login(responseData);
        history.push("/");
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const responseData = await sendRequest(
          `http://localhost:3000/api/v1/users/signup`,
          "POST",
          JSON.stringify({
            name: "Adam Shelley",
            email: "test3@test.com",
            password: 123456
          }),
          { "Content-Type": "application/json" }
        );
        auth.login();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="auth-container">
      <Card className="login-card">
        <form onSubmit={authSubmitHandler}>
          <h2>{isLoginMode ? "login" : "Sign-up"}</h2>
          {!isLoginMode && (
            <Input
              element="input"
              type="text"
              label="Your name"
              validators={[VALIDATOR_REQUIRE()]}
              id="name"
              errorText="Please enter a name"
              onInput={inputHandler}
            />
          )}
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

          <Button type="submit">{isLoginMode ? "Login" : "Sign-up"}</Button>
        </form>
        <Button inverse disabled={!isLoginMode} onClick={switchToSignUp}>
          Switch to: {isLoginMode ? "Sign-up" : "Login"}
        </Button>
      </Card>
    </div>
  );
};

export default Auth;
