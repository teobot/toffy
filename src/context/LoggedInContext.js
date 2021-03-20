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
  const [token, setToken] = useState(null);
  let history = useHistory();

  const handleLogout = () => {
    //   This handles the user logout
    toffy.defaults.headers.common["X-Authorization"] = "";
    StorageHelper.deleteStorage("@token");
    setUserLoggedIn(false);
    setToken(null);
  };

  const handleUserLogin = (userToken) => {
    //   This handles the user logging in
    toffy.defaults.headers.common["X-Authorization"] = userToken;
    StorageHelper.setStorage("@token", userToken);
    setToken(userToken);
    setUserLoggedIn(true);
  };

  return [
    {
      UserLoggedIn,
      handleLogout,
      handleUserLogin,
      token,
      TOKEN_STORAGE_NAME,
    },
  ];
};
