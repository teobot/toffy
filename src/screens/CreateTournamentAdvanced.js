import React, { useReducer, useContext } from "react";

import {
  Container,
  Form,
  Header,
  Input,
  Button,
  Segment,
  Dropdown,
  TextArea,
} from "semantic-ui-react";

import {
  tournament_types,
  tournament_dropdown,
} from "../components/Tournament/TournamentConfig";

import toffy from "../api/toffy";

import { useHistory } from "react-router";

import { ToastContext } from "../context/ToastContext";

const reducer = (state, action) => {
  switch (action.type) {
    case "change_title":
      return { ...state, title: action.payload };
    case "change_description":
      return { ...state, description: action.payload };
    case "change_type":
      return { ...state, type: action.payload };
    case "change_scoreTitle":
      return { ...state, scoreTitle: action.payload };
    case "change_pointsWin":
      return { ...state, pointsWin: action.payload };
    case "change_pointsLoss":
      return { ...state, pointsLoss: action.payload };
    case "change_rounds":
      return { ...state, rounds: action.payload };
    default:
      return state;
  }
};

export default function CreateTournamentScreen() {
  const [state, dispatch] = useReducer(reducer, {
    title: "",
    description: "",
    type: tournament_types.SINGLE_ELIMINATION,
    scoreTitle: "",
    pointsWin: 1,
    pointsLoss: 0,
    rounds: 1,
  });

  const { showToast } = useContext(ToastContext);

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
    try {
      const response = await toffy.post("/create", state);
      showToast("success", "Tournament Created!");

      history.push(`/tournament/${response.data}`);
    } catch (error) {
      // : error in creating the tournament

      if (error.response.data.error.errors) {
        for (const [key, value] of Object.entries(
          error.response.data.error.errors
        )) {
          showToast("error", value.message);
        }
      } else {
        showToast("error", error.response.data.error);
      }
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
            join your tournament, talk about rules. (NOT REQUIRED)
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
            options={tournament_dropdown}
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

          {state.type === tournament_types.FREEFORALL ? (
            <div style={settingContainerStyle}>
              <Header as="h4" style={{ color: "lightgrey" }}>
                <Header.Content>Free-For-All Settings</Header.Content>
              </Header>
              <Input
                value={state.rounds}
                onChange={(event) => {
                  handleInputChange(event, "change_rounds");
                }}
                style={inputStyle}
                className="settingInput"
                placeholder="Number of Rounds"
                type="number"
              />
              <div className="settingLabel">
                How many times the group will play each other
              </div>
            </div>
          ) : null}

          {state.type === tournament_types.SWISS ? (
            <div style={settingContainerStyle}>
              <Header as="h4" style={{ color: "lightgrey" }}>
                <Header.Content>Points</Header.Content>
              </Header>
              <Input
                value={state.pointsWin}
                onChange={(event) => {
                  handleInputChange(event, "change_pointsWin");
                }}
                style={inputStyle}
                className="settingInput"
                placeholder="Points for Win"
                type="number"
              />
              <div className="settingLabel">Points for a participant win</div>

              <Input
                value={state.pointsLoss}
                onChange={(event) => {
                  handleInputChange(event, "change_pointsLoss");
                }}
                style={inputStyle}
                className="settingInput"
                placeholder="Points for Loss"
                type="number"
              />
              <div className="settingLabel">Points for a participant loss</div>

              <Input
                value={state.rounds}
                onChange={(event) => {
                  handleInputChange(event, "change_rounds");
                }}
                style={inputStyle}
                className="settingInput"
                placeholder="Number of Rounds"
                type="number"
              />
              <div className="settingLabel">
                How many times each participant players each other
              </div>
            </div>
          ) : null}

          <div style={{ marginBottom: 15 }}>
            <Button onClick={handleFormSubmit} color="orange" size="huge">
              CREATE TOURNAMENT
            </Button>
            <div className="settingLabel">make the new tournament</div>
          </div>
        </Form>
      </Segment>
    </Container>
  );
}
