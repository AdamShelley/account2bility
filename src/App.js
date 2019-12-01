import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Switch,
  Route
} from "react-router-dom";

import NavHeader from "./Shared/Components/Navigation/NavHeader";
import Dashboard from "./Todos/Pages/Dashboard";
import Account from "./Users/Pages/Account";
import Auth from "./Shared/Pages/Auth";

function App() {
  return (
    <Router>
      <NavHeader />

      <main>
        <Switch>
          <Route path="/" exact>
            <Dashboard />
          </Route>
          <Route path="/account" exact>
            <Account />
          </Route>
          <Route path="/auth" exact>
            <Auth />
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
