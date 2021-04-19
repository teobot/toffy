import React from "react";
import { useHistory } from "react-router";

import {
  Segment,
  Divider,
  Header,
  Icon,
  Grid,
  Image,
  Label,
} from "semantic-ui-react";

// TODO: Come back to this and update the look and feel
export default function TournamentPlayerDisplay({ players, creator }) {
  let history = useHistory();

  return (
    <>
      {players.length < 1 ? (
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
      ) : null}
      <Segment basic>
        <Grid stretched>
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
                <Grid.Row stretched verticalAlign="middle">
                  <Grid.Column width={1}>
                    <Image rounded src={player.profile_pic} fluid />
                  </Grid.Column>
                  <Grid.Column width={15}>
                    <Header
                      inverted
                      as="a"
                      href=""
                      onClick={() => {
                        history.push(`/u/${player._id}`);
                      }}
                    >
                      {player.username}{" "}
                      <Label basic horizontal>
                        <Icon name="gem" />
                        {player.elo}
                      </Label>
                      {creator._id === player._id ? (
                        <small> - you 👋</small>
                      ) : null}
                    </Header>
                  </Grid.Column>
                </Grid.Row>
              );
            })}
        </Grid>
      </Segment>
    </>
  );
}
