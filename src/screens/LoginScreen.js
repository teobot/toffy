import React, { useState, useContext, useEffect } from "react";

import toffy from "../api/toffy";

import { Container, Input, Header, Form, Button } from "semantic-ui-react";

import { useHistory } from "react-router-dom";

import StorageHelper from "../helpers/StorageHelper";

import { LoggedInContext } from "../context/LoggedInContext";

export default function LoginScreen() {
  const [email, setEmail] = useState("theoclapperton@outlook.com");
  const [password, setPassword] = useState("password");
  let history = useHistory();
  const { handleUserLogin, TOKEN_STORAGE_NAME } = useContext(LoggedInContext);

  useEffect(() => {
    if (toffy.defaults.headers.common["X-Authorization"]) {
      // Toffy has header so redirect
      history.push("/home");
    }
  }, []);

  const handleLogin = async () => {
    // Handle the submitting of the auth data
    try {
      // Make a response to login
      const response = await toffy.post("/signin", {
        email,
        password,
      });

      // Tell Context user has logged in
      handleUserLogin(response.data.token);

      // Push the user to the home screen
      history.push("/home");
    } catch (error) {
      // TODO: User failed logging in
      console.log(error);
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <Container>
      <Header>Login</Header>
      <Form>
        <Form.Field>
          <label>Email</label>
          <Input
            onChange={handleEmailChange}
            value={email}
            placeholder="Email..."
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <Input
            onChange={handlePasswordChange}
            value={password}
            placeholder="Password..."
          />
        </Form.Field>
        <Button onClick={handleLogin} type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );
}
