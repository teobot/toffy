import React, { createContext, useContext, useState, useEffect } from "react";

import { ToastContext } from "../../../../context/ToastContext";

import {
  Divider,
  Container,
  Modal,
  Header,
  Image,
  Button,
  Table,
  Input,
  Label,
} from "semantic-ui-react";

import Round from "./Components/Round";

import toffy from "../../../../api/toffy";
import { useHistory } from "react-router";

export const TournamentContext = createContext();

export default function FreeForAllDisplay({
  getTournamentData,
  match_data,
  isAdmin,
  inProgress,
  players,
}) {
  const { showToast } = useContext(ToastContext);

  const [open, setOpen] = useState(false);
  const [roundToUpdate, setRoundToUpdate] = useState(null);
  const [roundScores, setRoundScores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [matchResult, setMatchResult] = useState([]);

  let history = useHistory();

  const updateRound = async (round) => {
    // Update the round the user has clicked on
    setRoundToUpdate(round);
  };

  const updateRoundToffy = async () => {
    // Update the data given to the database

    // Set loading to true
    setLoading(true);

    try {
      // Make the response call
      const res = await toffy.patch(
        `/update/freeforall/round/${roundToUpdate._id}`,
        { scores: roundScores }
      );

      // Update has successful

      // Show toast to user
      showToast("success", "Round results updated.");

      // Close the modal
      setOpen(false);

      // Set the next round to null (basically a round reset)
      setRoundToUpdate(null);

      // Update the match result display
      await getTournamentData();
    } catch (error) {
      // On round update failed

      // Show user a toast
      showToast("error", "Round update failed, please try again later.");
    }

    // Set loading back to false
    setLoading(false);
  };

  const handlePlayerPositionChange = async (player_id, position) => {
    // handle the changing of the player position
    let index = roundScores.findIndex((x) => x.player_id === player_id);
    if (index === -1) {
      // Player score just needs updating
      setRoundScores([
        ...roundScores,
        {
          player_id,
          position: parseInt(position),
        },
      ]);
    } else {
      // Player object already exists to update inside
      let newArray = roundScores;
      newArray[index] = {
        player_id,
        position: parseInt(position),
      };
      setRoundScores(newArray);
    }
  };

  useEffect(() => {
    if (roundToUpdate) {
      // if the round useState is not null then open the model
      setOpen(true);
      let tempRoundScores = [];
      for (let i = 0; i < roundToUpdate.players.length; i++) {
        const player = roundToUpdate.players[i];
        tempRoundScores.push({
          player_id: player.player._id,
          position: 0,
        });
      }
      setRoundScores(tempRoundScores);
    }
  }, [roundToUpdate]);

  useEffect(() => {
    let results = {};
    for (let i = 0; i < match_data.length; i++) {
      const round = match_data[i];
      if (round.finished) {
        for (let p = 0; p < round.players.length; p++) {
          const player = round.players[p];
          if (results[player.player._id]) {
            results[player.player._id] = {
              score: results[player.player._id].score + player.position,
            };
          } else {
            results[player.player._id] = {
              score: player.position,
            };
          }
        }
      }
    }
    setMatchResult(results);
  }, [match_data]);

  return (
    <>
      <TournamentContext.Provider value={{ isAdmin, inProgress, updateRound }}>
        <Divider hidden />
        <Container fluid>
          {match_data.map((round) => {
            return <Round round={round} />;
          })}
        </Container>
      </TournamentContext.Provider>

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
                return -1;
              } else {
                return 1;
              }
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
          setRoundToUpdate(null);
          setOpen(false);
        }}
        onOpen={() => {
          setOpen(true);
        }}
        open={open}
        id="custom-model"
      >
        <Modal.Header>Report Round Scores</Modal.Header>
        <Modal.Content image scrolling>
          <Modal.Description>
            <Table
              striped
              className="custom-table"
              basic
              unstackable
              selectable
              compact
            >
              <Table.Header>
                <Table.Row style={{ backgroundColor: "#1d222e" }}>
                  <Table.HeaderCell style={{ color: "white" }}>
                    Participant
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ color: "white" }}>
                    Position
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {roundToUpdate
                  ? roundToUpdate.players.map((player_data) => {
                      const { player } = player_data;
                      return (
                        <Table.Row>
                          <Table.Cell>
                            <Header as="h5" image inverted>
                              <Image
                                src={player.profile_pic}
                                rounded
                                size="mini"
                              />
                              <Header.Content>{player.username}</Header.Content>
                            </Header>
                          </Table.Cell>
                          <Table.Cell>
                            <Input
                              onChange={(event, data) => {
                                handlePlayerPositionChange(
                                  player._id,
                                  data.value
                                );
                              }}
                              fluid
                              type="number"
                              className="settingInput"
                            />
                          </Table.Cell>
                        </Table.Row>
                      );
                    })
                  : null}
              </Table.Body>
            </Table>
          </Modal.Description>
        </Modal.Content>

        <Modal.Actions>
          <Button
            loading={loading}
            color="black"
            onClick={() => {
              setRoundToUpdate(null);
              setOpen(false);
            }}
          >
            Exit
          </Button>
          <Button
            loading={loading}
            content="Save Scores"
            labelPosition="right"
            icon="save"
            onClick={updateRoundToffy}
            color="orange"
          />
        </Modal.Actions>
      </Modal>
    </>
  );
}
