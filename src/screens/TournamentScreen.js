import React, { useEffect, useState } from "react";

import calculateCreated from "../functions/calculateCreated";

import { useParams } from "react-router";
import {
  Button,
  Container,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Segment,
} from "semantic-ui-react";

import toffy from "../api/toffy";
import UserPlayingButtonGroup from "../components/Tournament/UserPlayingButtonGroup";
import AdminTools from "../components/Tournament/AdminTools";

export default function TournamentScreen() {
  let { _id } = useParams();

  const [result, setResult] = useState(null);

  useEffect(() => {
    getTournamentData();
  }, []);

  const getTournamentData = async () => {
    // This function gathers the tournament information
    try {
      const t = await toffy.get(`/tournament/${_id}`);
      console.log(t.data);
      setResult(t.data);
    } catch (error) {}
  };

  if (!_id) {
    // : The tournament _id param is missing
    return (
      <div>
        Please go back to <a href="/home">home</a>
      </div>
    );
  }

  if (!result) {
    // result is null
    return <div>Loading</div>;
  } else {
    return (
      <Container fluid>
        <Grid columns="equal">
          <Grid.Row>
            <Grid.Column width="12">
              <Header as="h1">
                <Header.Content>
                  {result.title}
                  <Header.Subheader>
                    {result.type} - listed {calculateCreated(result.created)}
                  </Header.Subheader>
                  <Header.Subheader>{result.description}</Header.Subheader>
                </Header.Content>
              </Header>
            </Grid.Column>
            <Grid.Column>
              <UserPlayingButtonGroup
                getTournamentData={getTournamentData}
                tournamentData={result}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        {/* Administrator tools for the creator */}
        {result.isAdmin ? (
          <AdminTools
            tournament={result}
            getTournamentData={getTournamentData}
          />
        ) : null}
        <Segment>
          <Header as="h4">Players:</Header>
          <List animated divided verticalAlign="middle">
            {result.players.map((player) => {
              return (
                <List.Item>
                  <Image
                    avatar
                    src="https://react.semantic-ui.com/images/avatar/small/christian.jpg"
                  />
                  <List.Content>
                    <List.Header as="h4">
                      {player.username}{" "}
                      {result.userId === player._id ? (
                        <List.Description>
                          <small>- this is you 👋</small>
                        </List.Description>
                      ) : null}
                    </List.Header>
                  </List.Content>
                </List.Item>
              );
            })}
            {result.players.length < 1 ? "No players" : null}
          </List>
        </Segment>
      </Container>
    );
  }
}
