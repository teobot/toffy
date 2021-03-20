import React, { useContext } from "react";

import { useHistory } from "react-router-dom";

import { Container, Segment, Button } from "semantic-ui-react";

import { LoggedInContext } from "../context/LoggedInContext";

export default function NavBar({ routes }) {
  let history = useHistory();
  const { UserLoggedIn, handleLogout } = useContext(LoggedInContext);
  return (
    <Container>
      <Segment clearing basic>
        {UserLoggedIn ? (
          <Button
            positive
            icon="home"
            circular
            floated="left"
            onClick={() => {
              history.push("/home");
            }}
          />
        ) : null}
        <Button
          floated="right"
          negative
          onClick={() => {
            if (UserLoggedIn) {
              handleLogout();
              history.push("/landing");
            } else {
              history.push("/login");
            }
          }}
          icon={UserLoggedIn ? "sign-out" : "sign-in"}
          content={UserLoggedIn ? "Logout" : "Login"}
        />
      </Segment>
    </Container>
  );
}
