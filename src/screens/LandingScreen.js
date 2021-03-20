import React from "react";
import { useHistory } from "react-router";
import { Button, Container } from "semantic-ui-react";

export default function LandingScreen() {
  let history = useHistory();
  return (
    <div>
      <h1>LandingScreen</h1>
      <Container>
        <Button
          onClick={() => {
            history.push("/login");
          }}
        >
          Login
        </Button>
        <Button
          onClick={() => {
            history.push("/create/account");
          }}
        >
          Create Account
        </Button>
      </Container>
    </div>
  );
}
