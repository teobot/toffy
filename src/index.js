import React, { useEffect } from "react";
import ReactDOM from "react-dom";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "semantic-ui-css/semantic.min.css";
import "./css/index.css";

import NavBar from "./components/NavBar";

import { Divider } from "semantic-ui-react";

import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import LandingScreen from "./screens/LandingScreen";
import AccountCreateScreen from "./screens/AccountCreateScreen";
import TournamentScreen from "./screens/TournamentScreen";
import UserScreen from "./screens/UserScreen";
import CreateTournamentScreen from "./screens/CreateTournamentScreen";

import useLoginContext, { LoggedInContext } from "./context/LoggedInContext";
import useWindowContext, { WindowContext } from "./context/WindowContext";
import useToastContext, { ToastContext } from "./context/ToastContext";

import RedirectLogin from "./functions/redirectLogin";
import UserEditScreen from "./screens/UserEditScreen";

const routes = [
  {
    routeName: "/u/:_id/edit",
    routerComponent: <UserEditScreen />,
  },
  {
    routeName: "/create/tournament",
    routerComponent: <CreateTournamentScreen />,
  },
  {
    routeName: "/u/:_id",
    routerComponent: <UserScreen />,
  },
  {
    routeName: "/tournament/:_id/:view?",
    routerComponent: <TournamentScreen />,
  },
  {
    routeName: "/create/account",
    routerComponent: <AccountCreateScreen />,
  },
  {
    routeName: "/login",
    routerComponent: <LoginScreen />,
  },
  {
    routeName: "/home",
    routerComponent: <HomeScreen />,
  },
  {
    routeName: "/",
    routerComponent: <LandingScreen />,
  },
];

function App() {
  // Context inits
  const [LoginContext] = useLoginContext();
  const [WindowContextValues] = useWindowContext();
  const [ToastContainer, ToastValues] = useToastContext();

  RedirectLogin(LoginContext);

  return (
    <WindowContext.Provider value={WindowContextValues}>
      <ToastContext.Provider value={ToastValues}>
        <LoggedInContext.Provider value={LoginContext}>
          <div>
            <NavBar routes={routes} />
            <div>
              <Switch>
                {routes.map((route) => {
                  return (
                    <Route path={route.routeName}>
                      {route.routerComponent}
                    </Route>
                  );
                })}
              </Switch>
            </div>
          </div>
          {!["/", "/login", "/create/account"].includes(
            window.location.pathname
          ) ? (
            <Divider section />
          ) : null}
          {ToastContainer}
        </LoggedInContext.Provider>
      </ToastContext.Provider>
    </WindowContext.Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Router basename="/toffy">
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
