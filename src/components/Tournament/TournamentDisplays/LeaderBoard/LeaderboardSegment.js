import React, { useContext, useState } from "react";
import { useHistory } from "react-router";

import {
  Segment,
  Table,
  Header,
  Image,
  Input,
  Button,
  Grid,
  Icon,
} from "semantic-ui-react";

import toffy from "../../../../api/toffy";

import { ToastContext } from "../../../../context/ToastContext";

function TableRow({ cell1, cell2, cell3, widths }) {
  return (
    <Table.Row>
      <Table.Cell textAlign="center" width={widths[0]}>
        {cell1}
      </Table.Cell>
      <Table.Cell width={widths[1]}>{cell2}</Table.Cell>
      <Table.Cell textAlign="center" width={widths[2]}>
        {cell3}
      </Table.Cell>
    </Table.Row>
  );
}

function LeaderboardTableRow({
  history,
  index,
  tournament_id,
  player,
  score,
  getTournamentData,
}) {
  const [playerScore, setPlayerScore] = useState(score);

  const { showToast } = useContext(ToastContext);

  const handleSave = async () => {
    try {
      const r = await toffy.patch(`/update/${tournament_id}/${player._id}`, {
        score: playerScore,
      });
      showToast("success", "Updated player score");
      getTournamentData()
    } catch (error) {
      // : failed saving a user score
      showToast("error", "Failed to save score, try again later.");
      setPlayerScore(score);
    }
  };

  return (
    <TableRow
      widths={[1, 9, 6]}
      cell1={index + 1}
      cell2={
        <Header as="h4" image inverted>
          <Image src={player.profile_pic} rounded size="mini" />
          <Header.Content>
            <a
              onClick={() => {
                history.push(`/u/${player._id}`);
              }}
            >
              {player.username}
            </a>
            <Header.Subheader>elo: {player.elo}</Header.Subheader>
          </Header.Content>
        </Header>
      }
      cell3={
        <Grid stretched>
          <Grid.Row stretched>
            <Grid.Column width={10}>
              <Input
                value={playerScore}
                onChange={(event, data) => {
                  setPlayerScore(data.value);
                }}
                className="settingInput"
                fluid
              />
            </Grid.Column>
            <Grid.Column width={6} textAlign="center">
              <Button onClick={handleSave} positive compact size="small">
                <Icon name="save" />
                Save
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      }
    />
  );
}

export default function LeaderboardSegment({
  match_data,
  isAdmin,
  tournament_id,
  getTournamentData,
  settings,
}) {
  let history = useHistory();

  return (
    <Segment basic>
      <Table inverted striped columns={3} selectable>
        <Table.Header>
          <Table.Row textAlign="center">
            <Table.HeaderCell>Position</Table.HeaderCell>
            <Table.HeaderCell>Player</Table.HeaderCell>
            <Table.HeaderCell>{settings.scoreTitle}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {[...match_data]
            .sort(function compare(a, b) {
              if (a.score < b.score) {
                return -1;
              }
              if (a.score > b.score) {
                return 1;
              }
              return 0;
            })
            .map(({ player, score }, index) => {
              if (isAdmin) {
                return (
                  <LeaderboardTableRow
                    history={history}
                    index={index}
                    tournament_id={tournament_id}
                    player={player}
                    score={score}
                    getTournamentData={getTournamentData}
                  />
                );
              }
              return (
                <TableRow
                  widths={[2, 9, 5]}
                  cell1={index + 1}
                  cell2={
                    <Header as="h4" image inverted>
                      <Image src={player.profile_pic} rounded size="mini" />
                      <Header.Content>
                        <a
                          onClick={() => {
                            history.push(`/u/${player._id}`);
                          }}
                        >
                          {player.username}
                        </a>
                        <Header.Subheader>elo: {player.elo}</Header.Subheader>
                      </Header.Content>
                    </Header>
                  }
                  cell3={score ? score : "No Score"}
                />
              );
            })}
        </Table.Body>
      </Table>
    </Segment>
  );
}
