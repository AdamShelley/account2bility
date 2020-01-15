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
  const [userId, setUserId] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [partnerId, setPartnerId] = useState();
  const [username, setUsername] = useState();
  const [partnerName, setPartnerName] = useState();
  const [userEmail, setuserEmail] = useState();

  const login = useCallback(data => {
    console.log(data);
    setIsLoggedIn(true);
    setUserId(data.user._id);
    setUsername(data.user.name);
    setPartnerName(data.user.partner);
    setuserEmail(data.user.email);
  }, []);

  const logout = useCallback(() => {
    console.log("Logged out!");
    setIsLoggedIn(false);
    setUserId(null);
    setUsername(null);
    setPartnerName(null);
    setuserEmail(null);
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
        {/* <Route path="/" exact>
          <Dashboard />
        </Route> */}
        <Route path="/auth" exact>
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        userId: userId,
        username: username,
        userEmail: userEmail,
        partnerId: partnerId,
        partnerName: partnerName,
        login: login,
        logout: logout
      }}
    >
      <Router>
        <NavHeader />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
