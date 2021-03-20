import React from "react";
import {
  Button,
  Grid,
  Header,
  Icon,
  Label,
  Segment,
  Step,
} from "semantic-ui-react";

import toffy from "../../api/toffy";

import TournamentStateDisplayGroup from "../Tournament/TournamentStateDisplayGroup";

export default function AdminTools({ tournament, getTournamentData }) {
  console.log(tournament);

  const handleTournamentProgress = async () => {
    // Handle the user wanting to progress the tournament
    try {
      const r = await toffy.post(`/tournament/${tournament._id}/progress`);
      await getTournamentData();
      console.log(r);
    } catch (error) {
      // TODO: handle the progression on fail
    }
  };

  return (
    <Segment>
      <Grid padded>
        <Grid.Row>
          <Header>Admin Tools</Header>
        </Grid.Row>
        <Grid.Row>
          <Button
            content="Type"
            icon="heart"
            label={{
              basic: true,
              pointing: "left",
              content: tournament.type,
            }}
          />

          <Button
            content="State"
            icon="cog"
            label={{
              basic: true,
              pointing: "left",
              content: tournament.state,
            }}
          />

          <Button
            content="Players"
            icon="group"
            label={{
              basic: true,
              pointing: "left",
              content: tournament.players.length,
            }}
          />
        </Grid.Row>
        <Grid.Row>
          <Button
            disabled={tournament.state === "Ended"}
            onClick={handleTournamentProgress}
            positive
          >
            Progress Tournament
          </Button>
        </Grid.Row>
        <Grid.Row>
          <TournamentStateDisplayGroup tournament={tournament} />
        </Grid.Row>
      </Grid>
    </Segment>
  );
}
