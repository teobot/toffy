import React, { useContext } from "react";

import { useHistory } from "react-router-dom";

import { Segment, Button, Dropdown, Menu } from "semantic-ui-react";

import { LoggedInContext } from "../context/LoggedInContext";

import logo from "../img/logo.png"

export default function NavBar() {
  let history = useHistory();
  const { UserLoggedIn, handleLogout, username, user_id } = useContext(
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
              src={logo}
            />
          </Menu.Item>

          {UserLoggedIn ? (
            <>
              <Menu.Item
                onClick={() => {
                  history.push("/home");
                }}
                link
                name="Home"
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
