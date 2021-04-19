import React, { useEffect } from "react";
import ReactDOM from "react-dom";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "semantic-ui-css/semantic.min.css";
import "./css/index.css";

import NavBar from "./components/NavBar";

import { Container, Divider } from "semantic-ui-react";

import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import LandingScreen from "./screens/LandingScreen";
import AccountCreateScreen from "./screens/AccountCreateScreen";
import TournamentScreen from "./screens/TournamentScreen";
import UserScreen from "./screens/UserScreen";
import CreateTournamentScreen from "./screens/CreateTournamentScreen";

import useLoginContext, { LoggedInContext } from "./context/LoggedInContext";

import RedirectLogin from "./functions/redirectLogin";

const routes = [
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
    routeName: "/landing",
    routerComponent: <LandingScreen />,
  },
  {
    routeName: "/",
    routerComponent: <HomeScreen />,
  },
];

function App() {
  // Context inits
  const [LoginContext] = useLoginContext();

  RedirectLogin(LoginContext);

  return (
    <LoggedInContext.Provider value={LoginContext}>
      <div>
        <NavBar routes={routes} />
        <div>
          <Switch>
            {routes.map((route) => {
              return (
                <Route path={route.routeName}>{route.routerComponent}</Route>
              );
            })}
          </Switch>
        </div>
      </div>
      <Divider section />
    </LoggedInContext.Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
