import React from "react";
import { useHistory } from "react-router";
import { Button, Container, Divider, Header } from "semantic-ui-react";

// TODO: Need to create this page
export default function LandingScreen() {
  let history = useHistory();
  return (
    <Container>
      <Divider hidden />

      <Header inverted as="h1">
        Landing Screen
      </Header>
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
    </Container>
  );
}
