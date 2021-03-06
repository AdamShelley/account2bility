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
import LoadingSpinner from "../Components/UIElements/LoadingSpinner";

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
  const [error, setError] = useState();
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
          `${process.env.REACT_APP_BACKEND_URL}/users/login`,
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          }),
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token
          }
        );
        auth.login(responseData);
        history.push("/");
      } catch (err) {
        setError("Wrong Credentials");
        setTimeout(() => {
          setError(null);
        }, 3000);
      }
    } else {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/signup`,
          "POST",
          JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          }),
          { "Content-Type": "application/json" }
        );

        auth.login(responseData);
        history.push("/");
      } catch (err) {
        setError("User already exists");
        setTimeout(() => {
          setError(null);
        }, 3000);
      }
    }
  };

  const signInTester = async () => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/login`,
        "POST",
        JSON.stringify({
          email: process.env.REACT_APP_TEST_USER,
          password: process.env.REACT_APP_TEST_PASS
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token
        }
      );
      auth.login(responseData);
      history.push("/");
    } catch (err) {}
  };

  return (
    <div className="auth-container">
      <Card className="login-card">
        <form onSubmit={authSubmitHandler}>
          {error && <p className="auth-error">{error}</p>}
          <h2>{isLoginMode ? "LOGIN" : "SIGNUP"}</h2>
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

          <Button addedClass="action-button" type="submit">
            {isLoginMode ? "Login" : "Sign-up"}
          </Button>
        </form>
        <Button addedClass="switch-button" inverse onClick={switchToSignUp}>
          {isLoginMode ? "Sign-up" : "Login"}
        </Button>

        {isLoading && <LoadingSpinner asOverlay />}
        <Button addedClass="tester-login" onClick={signInTester}>
          {" "}
          Trial Account{" "}
        </Button>
      </Card>
    </div>
  );
};

export default Auth;
