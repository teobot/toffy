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

import ImageClear from "../img/logoClear.png";

export default function NavBar({ routes }) {
  let history = useHistory();
  const { UserLoggedIn, handleLogout, token, username, user_id } = useContext(
    LoggedInContext
  );
  return (
    <div>
      <Segment inverted clearing padded style={{ borderRadius: 0 }}>
        <Menu inverted>
          <Menu.Item
            onClick={() => {
              if (UserLoggedIn) {
                history.push("/Home");
              } else {
                history.push("/landing");
              }
            }}
            link
            name="Home"
          />

          {UserLoggedIn ? (
            <>
              <Menu.Item
                onClick={() => {
                  history.push("/create/tournament");
                }}
                link
                name="Create"
              />
            </>
          ) : null}

          {UserLoggedIn ? (
            <>
              <Dropdown className="right link item" placeholder={username}>
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
                        history.push("/landing");
                      } else {
                        history.push("/login");
                      }
                    }}
                    text="Logout"
                  />
                </Dropdown.Menu>
              </Dropdown>
            </>
          ) : null}
        </Menu>
      </Segment>
    </div>
  );
}
