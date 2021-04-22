import { useEffect } from "react";

import toffy from "../api/toffy";
import axios from "axios";

import { useHistory, useLocation } from "react-router-dom";

import StorageHelper from "../helpers/StorageHelper";

const WHITELISTED_PATHS = ["/login", "/", "/create/account"];

// eslint-disable-next-line import/no-anonymous-default-export
export default ({
  UserLoggedIn,
  handleLogout,
  handleUserLogin,
  token,
  TOKEN_STORAGE_NAME,
}) => {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    redirect();
  }, []);

  const redirect = async () => {
    const storageToken = StorageHelper.getStorage(TOKEN_STORAGE_NAME);
    if (storageToken) {
      // token exists so needs testing
      try {
        // Make a request to gather the user information
        const loginAttempt = await toffy.request({
          method: "get",
          url: "/user",
          headers: {
            Accept: "application/json",
            "X-Authorization": storageToken,
          },
        });

        // Object destructor to gather username and user_id
        const { username, user_id } = loginAttempt.data;

        // The token is valid, log the user in
        handleUserLogin({ token: storageToken, username, user_id });

        // Push the user to the home screen
        // history.push("/home");
      } catch (error) {
        // : the storage token is invalid
        handleLogout();
      }
    } else {
      // No token in storage so need to direct if user is outside auth
      if (!WHITELISTED_PATHS.includes(location.pathname)) {
        // User is outside the auth
        history.push("/login");
        return;
      }
    }
  };
};
