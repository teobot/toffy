import React from "react";
import { Icon, Step } from "semantic-ui-react";

export default function TournamentStateDisplayGroup({ tournament }) {
  return (
    <Step.Group fluid>
      <Step
        active={tournament.state === "Joining"}
        disabled={tournament.state !== "Joining"}
      >
        <Icon name="play" />
        <Step.Content>
          <Step.Title>Joining</Step.Title>
        </Step.Content>
      </Step>

      <Step
        active={tournament.state === "Playing"}
        disabled={tournament.state !== "Playing"}
      >
        <Icon name="redo" />
        <Step.Content>
          <Step.Title>Playing</Step.Title>
        </Step.Content>
      </Step>

      <Step
        disabled={tournament.state !== "Ended"}
        active={tournament.state === "Ended"}
      >
        <Icon name="stop" />
        <Step.Content>
          <Step.Title>Ended</Step.Title>
        </Step.Content>
      </Step>
    </Step.Group>
  );
}
