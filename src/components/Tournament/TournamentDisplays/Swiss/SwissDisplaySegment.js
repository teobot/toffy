import React, {
  useEffect,
  createContext,
  useState,
  useReducer,
  useContext,
} from "react";

import {
  Divider,
  Grid,
  Header,
  Modal,
  Button,
  Input,
  Container,
  Table,
  Label,
  Image,
} from "semantic-ui-react";

import { ToastContext } from "../../../../context/ToastContext";
import { WindowContext } from "../../../../context/WindowContext";

import toffy from "../../../../api/toffy";
import Round from "./Components/Round";
import { useHistory } from "react-router";

export const TournamentContext = createContext();

const matchReducer = (state, action) => {
  switch (action.type) {
    case "change_player1Selected":
      return { ...state, player1Selected: true, player2Selected: false };
    case "change_player2Selected":
      return { ...state, player2Selected: true, player1Selected: false };
    case "change_player1Score":
      return { ...state, player1Score: action.payload };
    case "change_player2Score":
      return { ...state, player2Score: action.payload };
    case "reset":
      return {
        ...state,
        player1Selected: false,
        player2Selected: false,
        player1Score: 0,
        player2Score: 0,
      };
    default:
      return state;
  }
};

export default function SwissDisplaySegment({
  getTournamentData,
  match_data,
  isAdmin,
  settings,
  players,
  inProgress,
}) {
  const { windowWidth, windowHeight } = useContext(WindowContext);

  const { showToast } = useContext(ToastContext);

  const [loading, setLoading] = useState(false);

  const [state, dispatch] = useReducer(matchReducer, {
    player1Selected: false,
    player2Selected: false,
    player1Score: 0,
    player2Score: 0,
  });

  let history = useHistory();

  const [matchResult, setMatchResult] = useState([]);

  const [open, setOpen] = useState(false);
  const [modelMatch, setModelMatch] = useState(null);

  const changeSelectedMatch = (Match) => {
    setModelMatch(Match);
    setOpen(true);
  };

  const handleInputChange = (event, data) => {
    dispatch({ type: `change_${data.name}`, payload: parseInt(data.value) });
  };

  useEffect(() => {
    /*
      This code goes through each round and each match and calculates the scores for each player,
      These are then saved in a object array and saved using useState for the score display table
    */
    let results = {};
    for (let i = 0; i < match_data.length; i++) {
      const round = match_data[i];
      for (let m = 0; m < round.matches.length; m++) {
        const match = round.matches[m];
        if (match.winner !== null) {
          if (match.winner._id === match.player1.player._id) {
            if (results[match.player2.player._id]) {
              results[match.player2.player._id] = {
                score:
                  results[match.player2.player._id].score + settings.pointsLoss,
              };
            } else {
              results[match.player2.player._id] = {
                score: settings.pointsLoss,
              };
            }
          } else {
            if (results[match.player1.player._id]) {
              results[match.player1.player._id] = {
                score:
                  results[match.player1.player._id].score + settings.pointsLoss,
              };
            } else {
              results[match.player1.player._id] = {
                score: settings.pointsLoss,
              };
            }
          }
          if (results[match.winner._id]) {
            results[match.winner._id] = {
              score: results[match.winner._id].score + settings.pointsWin,
            };
          } else {
            results[match.winner._id] = { score: settings.pointsWin };
          }
        }
      }
    }
    setMatchResult(results);
  }, [match_data]);

  const UpdateMatchDetails = async () => {
    setLoading(true);
    try {
      const r = await toffy.patch(`/swiss/match/${modelMatch._id}`, {
        winner: state.player1Selected
          ? "player1"
          : state.player2Selected
          ? "player2"
          : null,
        scores: {
          player1: state.player1Score,
          player2: state.player2Score,
        },
      });

      // Match update is successful
      setOpen(false);
      dispatch({ type: "reset" });
      showToast("success", "Match updated.");
      await getTournamentData();
    } catch (error) {
      // : failed match update
      showToast("error", "Match update failed, try again later.");
    }
    setLoading(false);
  };

  return (
    <>
      <TournamentContext.Provider
        value={{ isAdmin, inProgress, changeSelectedMatch }}
      >
        <Divider hidden />
        <Container fluid>
          {match_data.map((round) => {
            return (
              <Round
                windowWidth={windowWidth}
                windowHeight={windowHeight}
                round={round}
              />
            );
          })}
        </Container>
      </TournamentContext.Provider>

      <Divider section />

      <Table inverted unstackable selectable compact>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={2}>Position</Table.HeaderCell>
            <Table.HeaderCell>Player</Table.HeaderCell>
            <Table.HeaderCell width={3} textAlign="center">
              Score
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {players
            .sort(function compare(a, b) {
              let aScore = matchResult[a._id] ? matchResult[a._id].score : 0;
              let bScore = matchResult[b._id] ? matchResult[b._id].score : 0;
              if (aScore < bScore) {
                return 1;
              }
              if (aScore > bScore) {
                return -1;
              }
              return 0;
            })
            .map((player, index) => {
              return (
                <Table.Row>
                  <Table.Cell>
                    {index === 0 ? (
                      <Label color="yellow" ribbon>
                        First
                      </Label>
                    ) : index === 1 ? (
                      <Label color="grey" ribbon>
                        Second
                      </Label>
                    ) : index === 2 ? (
                      <Label color="orange" ribbon>
                        Third
                      </Label>
                    ) : (
                      `${index + 1}`
                    )}
                  </Table.Cell>

                  <Table.Cell
                    onClick={() => {
                      history.push(`/u/${player._id}`);
                    }}
                    selectable
                    style={{ cursor: "pointer" }}
                  >
                    <Header inverted as="h4" image>
                      <Image src={player.profile_pic} rounded size="mini" />
                      <Header.Content>{player.username}</Header.Content>
                    </Header>
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    {matchResult[player._id]
                      ? matchResult[player._id].score
                      : 0}
                  </Table.Cell>
                </Table.Row>
              );
            })}
        </Table.Body>
      </Table>

      <Modal
        onClose={() => {
          dispatch({ type: "reset" });
          setOpen(false);
        }}
        onOpen={() => setOpen(true)}
        open={open}
      >
        <Modal.Header>Edit Match Details</Modal.Header>

        {modelMatch ? (
          <Modal.Content>
            <Header textAlign="center" size="huge">
              Who won?
            </Header>

            <Grid stretched>
              <Grid.Row columns="equal" stretched>
                <Grid.Column>
                  <Button
                    positive={state.player1Selected}
                    onClick={() => {
                      dispatch({
                        type: "change_player1Selected",
                      });
                    }}
                  >
                    {modelMatch.player1.player.username}
                  </Button>
                </Grid.Column>
                <Grid.Column width={2}></Grid.Column>
                <Grid.Column>
                  <Button
                    positive={state.player2Selected}
                    onClick={() => {
                      dispatch({
                        type: "change_player2Selected",
                      });
                    }}
                  >
                    {modelMatch.player2.player.username}
                  </Button>
                </Grid.Column>
              </Grid.Row>

              <Divider />
              <Grid.Row columns="equal" stretched>
                <Grid.Column>
                  <Input
                    fluid
                    label="Player 1 Score"
                    type="number"
                    name="player1Score"
                    value={state.player1Score}
                    onChange={handleInputChange}
                  />
                </Grid.Column>
                <Grid.Column width={2}></Grid.Column>
                <Grid.Column>
                  <Input
                    fluid
                    label="Player 2 Score"
                    type="number"
                    min={0}
                    max={9999}
                    name="player2Score"
                    value={state.player2Score}
                    onChange={handleInputChange}
                    labelPosition="right"
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Modal.Content>
        ) : null}

        <Modal.Actions>
          <Button
            negative
            onClick={() => {
              dispatch({ type: "reset" });
              setOpen(false);
            }}
          >
            Close
          </Button>
          <Button
            disabled={!state.player2Selected && !state.player1Selected}
            loading={loading}
            content="Save Changes"
            labelPosition="right"
            icon="checkmark"
            onClick={UpdateMatchDetails}
            positive
          />
        </Modal.Actions>
      </Modal>
    </>
  );
}
