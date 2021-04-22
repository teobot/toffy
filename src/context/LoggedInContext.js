/* eslint-disable import/no-anonymous-default-export */
import { createContext, useState } from "react";

import StorageHelper from "../helpers/StorageHelper";

import toffy from "../api/toffy";

import { useHistory } from "react-router";

export const LoggedInContext = createContext();

export const TOKEN_STORAGE_NAME = "@token";

// Importing CP
// *
// import { LoggedInContext } from "./context/LoggedInContext"
// const { UserLoggedIn, handleLogout, handleUserLogin } = useContext(LoggedInContext)
// *

export default () => {
  // This handles the global user of the user location information
  const [UserLoggedIn, setUserLoggedIn] = useState(false);

  // useStates variables
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [user_id, setUser_id] = useState(null);

  let history = useHistory();

  const handleLogout = () => {
    //   This handles the user logout
    toffy.defaults.headers.common["X-Authorization"] = "";
    StorageHelper.deleteStorage("@token");
    setToken(null);
    setUsername(null);
    setUser_id(null);
    setUserLoggedIn(false);
  };

  const handleUserLogin = (login_response) => {
    //  This handles the user logging in
    //  login_response === { token, username, user_id }
    toffy.defaults.headers.common["X-Authorization"] = login_response.token;
    StorageHelper.setStorage("@token", login_response.token);
    setToken(login_response.token);
    setUsername(login_response.username);
    setUser_id(login_response.user_id);
    setUserLoggedIn(true);
  };

  return [
    {
      UserLoggedIn,
      handleLogout,
      handleUserLogin,
      setUsername,
      token,
      username,
      user_id,
      TOKEN_STORAGE_NAME,
    },
  ];
};
