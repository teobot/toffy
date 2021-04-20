import React, { useReducer } from "react";

import {
  Container,
  Divider,
  Form,
  Header,
  Input,
  Button,
  Segment,
  Dropdown,
  TextArea,
} from "semantic-ui-react";

import { tournament_types } from "../components/Tournament/TournamentConfig";

import toffy from "../api/toffy";

import { useHistory } from "react-router";

const reducer = (state, action) => {
  switch (action.type) {
    case "change_title":
      return { ...state, title: action.payload };
    case "change_description":
      return { ...state, description: action.payload };
    case "change_listed":
      return { ...state, listed: action.payload };
    case "change_type":
      return { ...state, type: action.payload };
    case "change_scoreTitle":
      return { ...state, scoreTitle: action.payload };
    default:
      return state;
  }
};

export default function CreateTournamentScreen() {
  const [state, dispatch] = useReducer(reducer, {
    title: "",
    description: "",
    listed: true,
    type: tournament_types.SINGLE_ELIMINATION,
    scoreTitle: "",
  });

  const inputStyle = {
    width: "100%",
    maxWidth: 450,
  };

  const settingContainerStyle = {
    marginBottom: 40,
  };

  let history = useHistory();

  const handleInputChange = (event, type) => {
    dispatch({ type, payload: event.target.value });
  };

  const onTypeChange = (event, data) => {
    dispatch({ type: "change_type", payload: data.value });
  };

  const handleFormSubmit = async () => {
    console.log(state);
    try {
      const response = await toffy.post("/create", state);
      console.log(response.data);
      history.push(`/tournament/${response.data}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Segment basic>
        <Header style={{ color: "lightgrey" }} as="h2">
          <Header.Content>
            Create Tournament
            <Header.Subheader style={{ color: "lightgrey" }}>
              Create a new tournament
            </Header.Subheader>
          </Header.Content>
        </Header>
      </Segment>

      <Segment basic>
        <div style={settingContainerStyle}>
          <Header as="h4" style={{ color: "lightgrey" }}>
            <Header.Content>Title</Header.Content>
          </Header>
          <Input
            onChange={(event, data) => {
              dispatch({ type: "change_title", payload: data.value });
            }}
            style={inputStyle}
            value={state.title}
            className="settingInput"
          />
          <div className="settingLabel"></div>
        </div>

        <div style={settingContainerStyle}>
          <Header as="h4" style={{ color: "lightgrey" }}>
            <Header.Content>Description</Header.Content>
          </Header>
          <Form>
            <TextArea
              rows={5}
              value={state.description}
              placeholder="Talk about rules, player respect, ethics..."
              onChange={(event) => {
                handleInputChange(event, "change_description");
              }}
              className="settingTextArea"
            />
          </Form>
          <div className="settingLabel">
            here you can convey important information to the users wanting to
            join your tournament, talk about rules.
          </div>
        </div>

        <div style={settingContainerStyle}>
          <Header as="h4" style={{ color: "lightgrey" }}>
            <Header.Content>Type</Header.Content>
          </Header>
          <Dropdown
            className="settingDropdown"
            style={inputStyle}
            placeholder="Select Tournament Type"
            selection
            defaultValue={state.type}
            onChange={onTypeChange}
            options={[
              {
                key: tournament_types.LEADERBOARD,
                value: tournament_types.LEADERBOARD,
                text: tournament_types.LEADERBOARD,
              },
              {
                key: tournament_types.SINGLE_ELIMINATION,
                value: tournament_types.SINGLE_ELIMINATION,
                text: tournament_types.SINGLE_ELIMINATION,
              },
            ]}
          />
          <div className="settingLabel"></div>
        </div>

        <Form inverted>
          {state.type === tournament_types.LEADERBOARD ? (
            <div style={settingContainerStyle}>
              <Header as="h4" style={{ color: "lightgrey" }}>
                <Header.Content>Leaderboard scoring field</Header.Content>
              </Header>
              <Input
                value={state.scoreTitle}
                onChange={(event) => {
                  handleInputChange(event, "change_scoreTitle");
                }}
                style={inputStyle}
                className="settingInput"
              />
              <div className="settingLabel">
                this is what each player is scored on, if the tournament is a
                speedrun this might be `time` or if its a free-for-all it might
                be `kills`
              </div>
            </div>
          ) : null}

          <div style={{ marginBottom: 15 }}>
            <Button positive onClick={handleFormSubmit} primary>
              Update profile
            </Button>
            <div className="settingLabel">make the new tournament</div>
          </div>
        </Form>
      </Segment>
    </Container>
  );
}
