import React, { useContext, useState } from "react";

import {
  Segment,
  Header,
  Image,
  Icon,
  Label,
} from "semantic-ui-react";

import { shortDisplayDate } from "../../../functions/calculateCreated";

import { WindowContext } from "../../../context/WindowContext";

export default function TournamentSearchCard({ history, result }) {
  const { windowWidth } = useContext(WindowContext);

  const [onHover, setOnHover] = useState(false);

  return (
    <div
      style={{
        backgroundColor: "#4a4c52",
        marginBottom: 3,
        borderRadius: 3,
        cursor: "pointer",
      }}
      onClick={() => {
        history.push(`/tournament/${result._id}`);
      }}
      onMouseEnter={() => {
        setOnHover(true);
      }}
      onMouseLeave={() => {
        setOnHover(false);
      }}
    >
      <Segment
        basic
        inverted={onHover}
        floated
        style={{ position: "relative" }}
      >
        <Header inverted>
          <Image circular src={result.creator.profile_pic} />

          <Header.Content>
            <span
              style={{ fontSize: 14, fontWeight: 600 }}
              className="text-shadow"
            >
              {result.title}
            </span>
            <div
              style={{
                ...(windowWidth > 650
                  ? {
                      position: "absolute",
                      right: 14,
                      top: 14,
                    }
                  : {
                      padding: "3px 0px",
                    }),
              }}
            >
              <span style={{ fontSize: 12, color: "lightgrey" }}>
                <Icon name="user" style={{ marginRight: 2 }} /> {result.players}
              </span>
              <Label color="black" size="tiny">
                {shortDisplayDate(result.created)}
              </Label>
            </div>
            <Header.Subheader style={{ fontSize: 12 }}>
              {result.type} - {result.state}
            </Header.Subheader>
          </Header.Content>
        </Header>
      </Segment>
    </div>
  );
}
