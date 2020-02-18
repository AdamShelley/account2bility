import React, { Suspense } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route
} from "react-router-dom";

import NavHeader from "./Shared/Components/Navigation/NavHeader";
import Dashboard from "./Todos/Pages/Dashboard";
// import Account from "./Users/Pages/Account";
import Auth from "./Shared/Pages/Auth";
import { AuthContext } from "./Shared/context/auth-context";
import { useAuth } from "./Shared/Hooks/auth-hook";
import LoadingSpinner from "./Shared/Components/UIElements/LoadingSpinner";

const Account = React.lazy(() => import("./Users/Pages/Account"));

function App() {
  const {
    token,
    login,
    logout,
    userId,
    username,
    userEmail,
    partnerId,
    partnerName,
    userImage,
    partnerRequest,
    partnerRequested,
    partnerEmail
  } = useAuth();
  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Dashboard />
        </Route>
        <Route path="/account" exact>
          <Account />
        </Route>
        <Route path="/" exact>
          <Auth />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
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
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        username: username,
        userEmail: userEmail,
        partnerId: partnerId,
        partnerName: partnerName,
        login: login,
        logout: logout,
        userImage: userImage,
        partnerRequest: partnerRequest,
        partnerRequested: partnerRequested,
        partnerEmail: partnerEmail
      }}
    >
      <Router>
        <NavHeader />
        <main>
          <Suspense
            fallback={
              <div className="center">
                <LoadingSpinner asOverlay />
              </div>
            }
          >
            {routes}
          </Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
