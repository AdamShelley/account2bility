import React, { useState, useCallback } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route
} from "react-router-dom";

import NavHeader from "./Shared/Components/Navigation/NavHeader";
import Dashboard from "./Todos/Pages/Dashboard";
import Account from "./Users/Pages/Account";
import Auth from "./Shared/Pages/Auth";
import { AuthContext } from "./Shared/context/auth-context";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    console.log("Logged in!");
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    console.log("Logged out!");
    setIsLoggedIn(false);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Dashboard />
        </Route>
        <Route path="/account" exact>
          <Account
            username={"John Smith"}
            email={"john@john.com"}
            partnername={"Bilbo Baggins"}
          />
        </Route>
        <Route path="/auth" exact>
          <Auth />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Dashboard />
        </Route>
        <Route path="/auth" exact>
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <Router>
        <NavHeader />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
