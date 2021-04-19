import React, { useReducer } from "react";

import {
  Container,
  Divider,
  Form,
  Header,
  Checkbox,
  Button,
  Segment,
  Dropdown,
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
      <Divider hidden />
      <Header inverted>Create Tournament Screen</Header>

      <Segment inverted raised>
        <Form inverted>
          <Form.Field>
            <label>Title</label>
            <input
              value={state.title}
              placeholder="Title"
              onChange={(event) => {
                handleInputChange(event, "change_title");
              }}
            />
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <input
              value={state.description}
              placeholder="Description"
              onChange={(event) => {
                handleInputChange(event, "change_description");
              }}
            />
          </Form.Field>

          <Form.Field>
            <label>Tournament Type</label>
            <Dropdown
              placeholder="Select Tournament Type"
              fluid
              search
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
          </Form.Field>

          {state.type === tournament_types.LEADERBOARD ? (
            <>
              <Form.Field>
                <label>Leaderboard Scoring By</label>
                <input
                  value={state.scoreTitle}
                  placeholder="Leaderboard Scoring By"
                  onChange={(event) => {
                    handleInputChange(event, "change_scoreTitle");
                  }}
                />
              </Form.Field>
            </>
          ) : null}

          <Button positive onClick={handleFormSubmit} type="submit">
            Submit
          </Button>
        </Form>
      </Segment>
    </Container>
  );
}
