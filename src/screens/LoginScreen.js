import React, { useState, useContext, useEffect } from "react";

import toffy from "../api/toffy";

import {
  Container,
  Input,
  Header,
  Button,
  Divider,
  Grid,
} from "semantic-ui-react";

import { useHistory } from "react-router-dom";

import { LoggedInContext } from "../context/LoggedInContext";
import { ToastContext } from "../context/ToastContext";
import { WindowContext } from "../context/WindowContext";

import topImage from "../img/widescreen-020.jpg";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [sideImageSize, setSideImageSize] = useState(150);

  let history = useHistory();

  const { handleUserLogin } = useContext(LoggedInContext);
  const { showToast } = useContext(ToastContext);
  const { windowWidth, windowHeight } = useContext(WindowContext);

  useEffect(() => {
    if (toffy.defaults.headers.common["X-Authorization"]) {
      // Toffy has header so redirect
      history.push("/home");
    }
    setSideImageSize(document.getElementById("navbar").clientHeight + 50);
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
      handleUserLogin(response.data);

      showToast("success", "Log in successful.");

      // Push the user to the home screen
      history.push("/home");
    } catch (error) {
      // : User failed logging in
      showToast("error", error.response.data.error);
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const imageCoverStyle = {
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: `${windowWidth > 650 ? "center" : "top"} center`,
  };

  return (
    <>
      <Grid>
        <Grid.Row>
          <Grid.Column
            computer={6}
            largeScreen={6}
            mobile={16}
            widescreen={6}
            tablet={6}
            width={6}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "lavender",
                display: "flex",
                minHeight:
                  windowWidth > 650
                    ? windowHeight - sideImageSize
                    : windowHeight / 4,
                ...imageCoverStyle,
                backgroundImage: `url(${topImage})`,
              }}
              className="fade-image"
            />
          </Grid.Column>
          <Grid.Column
            computer={10}
            largeScreen={10}
            mobile={16}
            widescreen={10}
            tablet={10}
            width={10}
          >
            <div
              style={{
                display: "flex",
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Container text style={{ padding: `0px ${windowWidth / 15}px` }}>
                <Header inverted style={{ fontSize: 16 + windowWidth / 60 }}>
                  <Header.Content>
                    Log in
                    <Header.Subheader>
                      Welcome back! Please enter your details below.
                    </Header.Subheader>
                  </Header.Content>
                </Header>
                <Divider section />
                <div>
                  <div>
                    <Input
                      placeholder="Email"
                      onChange={handleEmailChange}
                      value={email}
                      className="settingInput"
                      fluid
                    />
                  </div>
                  <Divider hidden />
                  <div>
                    <Input
                      placeholder="Password"
                      onChange={handlePasswordChange}
                      value={password}
                      className="settingInput"
                      fluid
                      type="password"
                    />
                  </div>
                  <Divider hidden />
                  <div>
                    <a href="/create/account">Don't have a account?</a>
                  </div>
                  <Divider section={windowWidth > 650} />
                  <Button
                    size={windowWidth > 650 ? "huge" : "large"}
                    fluid
                    onClick={handleLogin}
                    color="orange"
                  >
                    Login
                  </Button>
                </div>
              </Container>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
}
