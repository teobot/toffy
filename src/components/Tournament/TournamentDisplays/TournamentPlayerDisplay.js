import React, { useContext } from "react";

import { useHistory } from "react-router";

import {
  Segment,
  Divider,
  Header,
  Icon,
  Image,
  Label,
  List,
  Button,
} from "semantic-ui-react";

import toffy from "../../../api/toffy";

import { ToastContext } from "../../../context/ToastContext";
import { LoggedInContext } from "../../../context/LoggedInContext";

import { states } from "../TournamentConfig";

export default function TournamentPlayerDisplay({
  players,
  creator,
  isAdmin,
  getTournamentData,
  tournament_id,
  state,
}) {
  let history = useHistory();

  const { showToast } = useContext(ToastContext);

  const { user_id } = useContext(LoggedInContext);

  const kickPlayer = async (player) => {
    //   Handle the admin kicking a user from the tournament
    if (state !== states.JOIN) {
      // Don't make request if the tournament has finished
      return;
    }
    try {
      const r = await toffy.delete(
        `/tournament/${tournament_id}/leave/${player._id}`
      );
      showToast("info", `${player.username} has been kicked.`);
      await getTournamentData();
    } catch (error) {
      // : player failed to leave the tournament
      showToast("error", "Failed to kick player");
    }
  };

  if (players.length < 1) {
    return (
      <>
        <Divider section hidden />
        <Segment padded basic textAlign="center" vertical>
          <Header as="h1" icon inverted>
            <Icon name="group" />
            No Players Joined
            <Header.Subheader>be the first to join..</Header.Subheader>
          </Header>
        </Segment>
      </>
    );
  } else {
    return (
      <Segment basic padded>
        <List animated verticalAlign="middle" divided size="massive" inverted>
          {[...players]
            .sort(function compare(a, b) {
              if (a.elo < b.elo) {
                return 1;
              }
              if (a.elo > b.elo) {
                return -1;
              }
              return 0;
            })
            .map((player) => {
              return (
                <List.Item
                  style={{
                    cursor: "pointer",
                    ...(user_id === player._id
                      ? {
                          backgroundColor: "#22252d",
                          borderRight: "1px solid orange",
                        }
                      : {}),
                  }}
                >
                  {isAdmin &&
                  state === states.JOIN &&
                  creator._id !== player._id ? (
                    <Segment basic compact floated="right">
                      <Button
                        onClick={() => {
                          kickPlayer(player);
                        }}
                        negative
                        size="tiny"
                      >
                        Kick
                      </Button>
                    </Segment>
                  ) : null}
                  <Image
                    onClick={() => {
                      history.push(`/u/${player._id}`);
                    }}
                    avatar
                    src={player.profile_pic}
                  />
                  <List.Content
                    onClick={() => {
                      history.push(`/u/${player._id}`);
                    }}
                  >
                    <List.Header>{player.username}</List.Header>
                    <List.Description>
                      <Label color="black">elo: {player.elo}</Label>
                    </List.Description>
                  </List.Content>
                </List.Item>
              );
            })}
        </List>
      </Segment>
    );
  }
}
