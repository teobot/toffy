import React from "react";

import { Segment, Header } from "semantic-ui-react";

import Match from "./Match";

export default function Round({ round }) {
  return (
    <Segment basic>
      <Header inverted>
        <Header.Content>{`Round ${round.round_index}`}</Header.Content>
      </Header>
      <Match
        round_index={round.round_index}
        players={round.players}
        round={round}
      />
    </Segment>
  );
}
