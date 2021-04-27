import React from "react";

import { Segment, Header } from "semantic-ui-react";

import ScrollContainer from "react-indiana-drag-scroll";
import Match from "./Match";

export default function Round({ round, windowHeight, windowWidth }) {
  return (
    <Segment basic>
      <Header inverted>
        <Header.Content>{`Round ${round.round}`}</Header.Content>
      </Header>
      <ScrollContainer
        style={{ maxHeight: windowHeight / 3, width: "100%" }}
        hideScrollbars={false}
        className="scroll-container"
      >
        <div
          style={{
            display: "flex",
            height: "100%",
            alignItems: "center",
            padding: "15px 0px",
          }}
        >
          {round.matches.map((match) => {
            return <Match match={match} />;
          })}
        </div>
      </ScrollContainer>
    </Segment>
  );
}
