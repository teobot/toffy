import React, { useEffect, useState } from "react";

import calculateCreated from "../functions/calculateCreated";

import { useParams } from "react-router";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  Label,
  List,
  Segment,
} from "semantic-ui-react";

import toffy from "../api/toffy";

import UserPlayingButtonGroup from "../components/Tournament/TournamentControls/UserPlayingButtonGroup";
import AdminTools from "../components/Tournament/AdministrationTools/AdminTools";
import TournamentBracketSegment from "../components/Tournament/TournamentDisplays/SingleElimination/TournamentBracketSegment";

import { tournament_types } from "../components/Tournament/TournamentConfig";

export default function TournamentScreen() {
  let { _id } = useParams();

  const [result, setResult] = useState(null);

  useEffect(() => {
    getTournamentData();
  }, []);

  const MatchDataDisplayComponent = (type, match_data, isAdmin) => {
    if (type === tournament_types.SINGLE_ELIMINATION) {
      return (
        <TournamentBracketSegment match_data={match_data} isAdmin={isAdmin} />
      );
    }

    return null;
  };

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
        {/* This displays the title, type, creation time, desc and join/leave buttons in a sub component */}
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

        {/* Display the match data to the user */}
        {MatchDataDisplayComponent(
          result.type,
          result.match_data,
          result.isAdmin
        )}

        {/* This displays the players in a grid */}
        <Segment>
          <Header as="h4">{result.players.length} Players:</Header>
          <Grid stretched>
            {[...result.players]
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
                      <Image
                        rounded
                        src="https://react.semantic-ui.com/images/avatar/small/christian.jpg"
                        fluid
                      />
                    </Grid.Column>
                    <Grid.Column width={15}>
                      <Header as="h3">
                        {player.username}{" "}
                        <Label basic horizontal>
                          <Icon name="gem" />
                          {player.elo}
                        </Label>
                        {result.userId === player._id ? (
                          <small> - you 👋</small>
                        ) : null}
                      </Header>
                    </Grid.Column>
                  </Grid.Row>
                );
              })}
            {result.players.length < 1 ? <Grid.Row>No players</Grid.Row> : null}
          </Grid>
        </Segment>

        <Divider section hidden />
      </Container>
    );
  }
}
