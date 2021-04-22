import React, { useContext } from "react";

import { useHistory } from "react-router-dom";

import {
  Container,
  Segment,
  Button,
  Image,
  Grid,
  Dropdown,
  Menu,
} from "semantic-ui-react";

import { LoggedInContext } from "../context/LoggedInContext";

export default function NavBar({ routes }) {
  let history = useHistory();
  const { UserLoggedIn, handleLogout, token, username, user_id } = useContext(
    LoggedInContext
  );
  return (
    <div id="navbar">
      <Segment inverted clearing padded style={{ borderRadius: 0 }}>
        <Menu inverted>
          <Menu.Item
            onClick={() => {
              history.push(UserLoggedIn ? "/home" : "/");
            }}
          >
            <img
              alt="company logo"
              src="https://react.semantic-ui.com/logo.png"
            />
          </Menu.Item>

          {false ? (
            <>
              <Menu.Item
                onClick={() => {
                  history.push("/create/tournament");
                }}
                link
                name="Tournament Creation"
              />
            </>
          ) : (
            <></>
          )}

          {UserLoggedIn ? (
            <Dropdown item text={username} className="right">
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => {
                    history.push(`/u/${user_id}`);
                  }}
                  text="Profile"
                />
                <Dropdown.Divider />
                <Dropdown.Item
                  onClick={() => {
                    if (UserLoggedIn) {
                      handleLogout();
                      history.push("/");
                    } else {
                      history.push("/login");
                    }
                  }}
                  text="Logout"
                />
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Menu.Menu position="right">
              <Menu.Item
                onClick={() => {
                  history.push("/login");
                }}
                link
                name="Login"
              />
              <Menu.Item>
                <Button
                  onClick={() => {
                    history.push("/create/account");
                  }}
                  color="orange"
                  compact
                  size="tiny"
                >
                  SIGN UP
                </Button>
              </Menu.Item>
            </Menu.Menu>
          )}
        </Menu>
      </Segment>
    </div>
  );
}
