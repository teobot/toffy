import React, { useContext, useState } from "react";
import { useHistory } from "react-router";

import {
  Segment,
  Table,
  Header,
  Image,
  Input,
  Button,
  Icon,
  Label,
} from "semantic-ui-react";

import toffy from "../../../../api/toffy";

import { ToastContext } from "../../../../context/ToastContext";

import { sortComparison } from "../../../../functions/sortFunction";

function TableRow({ cell1, cell2, cell3, widths }) {
  return (
    <Table.Row>
      <Table.Cell textAlign="center" width={widths[0]}>
        {cell1}
      </Table.Cell>
      <Table.Cell selectable width={widths[1]}>
        {cell2}
      </Table.Cell>
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
  setTableKey,
}) {
  const [playerScore, setPlayerScore] = useState(score);

  const { showToast } = useContext(ToastContext);

  const handleSave = async () => {
    try {
      const r = await toffy.patch(`/update/${tournament_id}/${player._id}`, {
        score: playerScore,
      });
      showToast("success", "Updated player score");
      await getTournamentData();
      setTableKey(new Date());
    } catch (error) {
      // : failed saving a user score
      showToast("error", "Failed to save score, try again later.");
      setPlayerScore(score);
    }
  };

  return (
    <TableRow
      widths={[2, 6, 8]}
      cell1={
        index === 0 ? (
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
        )
      }
      cell2={
        <Header as="h4" image inverted>
          <Image src={player.profile_pic} rounded size="mini" />
          <Header.Content
            style={{ cursor: "pointer" }}
            onClick={() => {
              history.push(`/u/${player._id}`);
            }}
          >
            {player.username}
            <Header.Subheader>elo: {player.elo}</Header.Subheader>
          </Header.Content>
        </Header>
      }
      cell3={
        <Input
          icon={
            <Button icon positive onClick={handleSave}>
              <Icon name="save" />
            </Button>
          }
          fluid
          className="settingInput"
          placeholder="Score..."
          value={playerScore}
          onChange={(event, data) => {
            setPlayerScore(data.value);
          }}
        />
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

  const [searchUsername, setSearchUsername] = useState("");

  const [tableKey, setTableKey] = useState(new Date());

  return (
    <Segment basic>
      {/* Search bar */}
      <Input
        onChange={(event, data) => {
          setSearchUsername(data.value);
        }}
        icon={
          <Icon
            name="remove"
            inverted
            circular
            link
            onClick={() => {
              setSearchUsername("");
            }}
          />
        }
        value={searchUsername}
        className="settingInput"
        fluid
        placeholder="Search..."
      />

      <Table inverted striped unstackable selectable compact key={tableKey}>
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
              return sortComparison(a, b);
            })
            .map(({ player, score }, index) => {
              if (searchUsername) {
                if (!player.username.includes(searchUsername)) {
                  return null;
                }
              }
              if (isAdmin) {
                return (
                  <LeaderboardTableRow
                    setTableKey={setTableKey}
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
                      <Header.Content
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          history.push(`/u/${player._id}`);
                        }}
                      >
                        {player.username}
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
