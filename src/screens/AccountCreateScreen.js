import React, { useReducer, useContext, useState, useEffect } from "react";

import { useHistory } from "react-router";

import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Input,
} from "semantic-ui-react";

import toffy from "../api/toffy";

import { LoggedInContext } from "../context/LoggedInContext";
import { ToastContext } from "../context/ToastContext";
import { WindowContext } from "../context/WindowContext";

import topImage from "../img/widescreen-019.jpg";

const reducer = (state, action) => {
  switch (action.type) {
    case "change_username":
      return { ...state, username: action.payload };
    case "change_firstname":
      return { ...state, firstname: action.payload };
    case "change_lastname":
      return { ...state, lastname: action.payload };
    case "change_email":
      return { ...state, email: action.payload };
    case "change_password":
      return { ...state, password: action.payload };
    default:
      return state;
  }
};

export default function AccountCreateScreen() {
  const [state, dispatch] = useReducer(reducer, {
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [sideImageSize, setSideImageSize] = useState(150);

  let history = useHistory();

  const { handleUserLogin } = useContext(LoggedInContext);
  const { showToast } = useContext(ToastContext);
  let { windowWidth, windowHeight } = useContext(WindowContext);

  useEffect(() => {
    if (toffy.defaults.headers.common["X-Authorization"]) {
      // Toffy has header so redirect
      history.push("/home");
    }
    setSideImageSize(document.getElementById("navbar").clientHeight + 50);
  }, []);

  const handleSubmit = async () => {
    // Handle submit of player information
    try {
      // make the account post
      const r = await toffy.post("/signup", state);
      // account creation successful

      // Tell Context user has logged in
      handleUserLogin(r.data);

      // Push the user to the home screen
      history.push("/home");
    } catch (error) {
      showToast("error", error.response.data.error);
    }
  };

  const handleInputChange = (event, type) => {
    dispatch({ type, payload: event.target.value });
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
                    Sign Up
                    <Header.Subheader>
                      Get started today, by entering you details below.
                    </Header.Subheader>
                  </Header.Content>
                </Header>
                <Divider section />
                <div>
                  <div>
                    <Input
                      placeholder="Username"
                      onChange={(event) => {
                        handleInputChange(event, "change_username");
                      }}
                      value={state.username}
                      className="settingInput"
                      fluid
                    />
                  </div>
                  <Divider hidden />
                  <div>
                    <Input
                      placeholder="Firstname"
                      onChange={(event) => {
                        handleInputChange(event, "change_firstname");
                      }}
                      value={state.firstname}
                      className="settingInput"
                      fluid
                    />
                  </div>

                  <Divider hidden />
                  <div>
                    <Input
                      placeholder="Lastname"
                      onChange={(event) => {
                        handleInputChange(event, "change_lastname");
                      }}
                      value={state.lastname}
                      className="settingInput"
                      fluid
                    />
                  </div>

                  <Divider hidden />
                  <div>
                    <Input
                      placeholder="Email"
                      onChange={(event) => {
                        handleInputChange(event, "change_email");
                      }}
                      value={state.email}
                      className="settingInput"
                      fluid
                    />
                  </div>

                  <Divider hidden />
                  <div>
                    <Input
                      placeholder="Password"
                      onChange={(event) => {
                        handleInputChange(event, "change_password");
                      }}
                      value={state.password}
                      className="settingInput"
                      fluid
                      type="password"
                    />
                  </div>

                  <Divider hidden />
                  <div>
                    <a
                      onClick={() => {
                        history.push("/login");
                      }}
                    >
                      Already have a account?
                    </a>
                  </div>
                  <Divider section={windowWidth > 650} />
                  <Button
                    size={windowWidth > 650 ? "huge" : "large"}
                    fluid
                    onClick={handleSubmit}
                    color="orange"
                  >
                    CREATE ACCOUNT
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
