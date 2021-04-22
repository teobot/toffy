import React, { useContext, useEffect, useReducer, useState } from "react";

import { useHistory, useParams } from "react-router";

import {
  Container,
  Divider,
  Header,
  Segment,
  Input,
  Button,
  Image,
} from "semantic-ui-react";

import toffy from "../api/toffy";

import { LoggedInContext } from "../context/LoggedInContext";
import { ToastContext } from "../context/ToastContext";

import useWindowWidth from "../functions/useWindowWidth";

import { ALLOWED_PROFILE_IMAGES } from "../components/Tournament/TournamentConfig";

import { difference } from "../functions/difference";

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
    case "change_profile_pic":
      return { ...state, profile_pic: action.payload };
    case "change_state":
      return action.payload;
    default:
      return state;
  }
};

export default function UserEditScreen() {
  const { windowHeight } = useWindowWidth();

  let history = useHistory();

  const { setUsername, user_id } = useContext(LoggedInContext);
  const { showToast } = useContext(ToastContext);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const [state, dispatch] = useReducer(reducer, {
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    profile_pic: "",
  });

  const inputStyle = {
    width: "100%",
    maxWidth: 450,
  };

  const settingContainerStyle = {
    marginBottom: 40,
  };

  const handleUserUpdate = async () => {
    //   Handle Updating the user
    setLoading(true);
    let update = difference(state, user);
    try {
      await toffy.patch(`/user`, update);
      setLoading(false);
      history.push(`/u/${user_id}`);
      setUsername(state.username);
      showToast("success", "Profile updated.")
    } catch (error) {
      // : Failed user information update
      showToast("error", "Update failed, please try again later.")
    }
    setLoading(false);
  };

  const getUserInformation = async () => {
    //   This gathers the user information
    try {
      const userRes = await toffy.get("/get/user");
      setUser(userRes.data);
      dispatch({ type: "change_state", payload: userRes.data });
    } catch (error) {
      // : Failed to get user information
      showToast("error", "User doesn't exist.")
      history.push("/home")
    }
  };

  useEffect(() => {
    getUserInformation();
  }, []);

  return (
    <div>
      <div
        style={{
          width: "100%",
          height: windowHeight / 5,
          background: "rgb(10,67,149)",
          background:
            "linear-gradient(90deg, rgba(10,67,149,1) 0%, rgba(0,255,89,1) 100%)",
        }}
      />
      <Container>
        <Divider hidden />

        <Segment basic>
          <Header style={{ color: "lightgrey" }} as="h2">
            <Header.Content>
              User Settings
              <Header.Subheader style={{ color: "lightgrey" }}>
                Manage your account settings
              </Header.Subheader>
            </Header.Content>
          </Header>
        </Segment>

        <Segment basic style={{ marginLeft: 0, marginRight: 0 }}>
          <div style={settingContainerStyle}>
            <Header as="h4" style={{ color: "lightgrey" }}>
              <Header.Content>Username</Header.Content>
            </Header>
            <Input
              onChange={(event, data) => {
                dispatch({ type: "change_username", payload: data.value });
              }}
              style={inputStyle}
              value={state.username}
              className="settingInput"
            />
          </div>

          <div style={settingContainerStyle}>
            <Header as="h4" style={{ color: "lightgrey" }}>
              <Header.Content>Profile image</Header.Content>
            </Header>
            <Image.Group>
              {ALLOWED_PROFILE_IMAGES.map((image) => {
                return (
                  <Image
                    style={{
                      ...(image === state.profile_pic
                        ? { border: "1px solid orange" }
                        : {}),
                    }}
                    disabled={image !== state.profile_pic}
                    onClick={() => {
                      dispatch({ type: "change_profile_pic", payload: image });
                    }}
                    src={image}
                  />
                );
              })}
            </Image.Group>
          </div>

          <div style={settingContainerStyle}>
            <Header as="h4" style={{ color: "lightgrey" }}>
              <Header.Content>Personal Email</Header.Content>
            </Header>
            <Input
              onChange={(event, data) => {
                dispatch({ type: "change_email", payload: data.value });
              }}
              style={inputStyle}
              value={state.email}
              className="settingInput"
            />
            <div className="settingLabel">(not visible to other users)</div>
          </div>

          <div style={settingContainerStyle}>
            <Header as="h4" style={{ color: "lightgrey" }}>
              <Header.Content>Firstname</Header.Content>
            </Header>
            <Input
              onChange={(event, data) => {
                dispatch({ type: "change_firstname", payload: data.value });
              }}
              style={inputStyle}
              value={state.firstname}
              className="settingInput"
            />
            <div className="settingLabel">(not visible to other users)</div>
          </div>

          <div style={settingContainerStyle}>
            <Header as="h4" style={{ color: "lightgrey" }}>
              <Header.Content>Lastname</Header.Content>
            </Header>
            <Input
              onChange={(event, data) => {
                dispatch({ type: "change_lastname", payload: data.value });
              }}
              style={inputStyle}
              value={state.lastname}
              className="settingInput"
            />
            <div className="settingLabel">(not visible to other users)</div>
          </div>

          <div style={{ marginBottom: 15 }}>
            <Button onClick={handleUserUpdate} primary loading={loading}>
              Update profile
            </Button>
            <div className="settingLabel">update changes to profile</div>
          </div>
        </Segment>
      </Container>
    </div>
  );
}
