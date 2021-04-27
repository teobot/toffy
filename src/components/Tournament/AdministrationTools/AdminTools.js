import React, { useContext, useState } from "react";
import {
  Button,
  Divider,
  Form,
  Header,
  Input,
  Segment,
  TextArea,
} from "semantic-ui-react";

import toffy from "../../../api/toffy";

import { states } from "../TournamentConfig";

import { ToastContext } from "../../../context/ToastContext";

export default function AdminTools({ tournament, getTournamentData }) {
  const [tournamentTitle, setTournamentTitle] = useState(tournament.title);

  const [loading, setLoading] = useState(false);

  const [tournamentDescription, setTournamentDescription] = useState(
    tournament.description
  );

  const { showToast } = useContext(ToastContext);

  const handleTournamentProgress = async () => {
    // Handle the user wanting to progress the tournament
    try {
      const r = await toffy.post(`/tournament/${tournament._id}/progress`);
      await getTournamentData();
    } catch (error) {
      // : handle the progression on fail
      showToast("error", error.response.data.error);
    }
  };

  const handleTournamentUpdate = async () => {
    // Handle patching the tournament
    setLoading(true);
    let updateObj = {
      ...(tournamentTitle ? { title: tournamentTitle } : null),
      ...(tournamentDescription
        ? { description: tournamentDescription }
        : null),
    };

    try {
      // Send the update off
      await toffy.patch(`/tournament/${tournament._id}`, updateObj);

      // Update the tournament information
      await getTournamentData();
    } catch (error) {
      //  : failed updating the tournament
      showToast("error", "Failed update, try again later.");
    }
    setLoading(false);
  };

  return (
    <Segment.Group>
      <Divider hidden />
      <Segment basic>
        <Header style={{ color: "lightgrey" }} as="h2">
          <Header.Content>
            Settings
            <Header.Subheader style={{ color: "lightgrey" }}>
              Manage aspects of the tournament.
            </Header.Subheader>
          </Header.Content>
        </Header>
      </Segment>

      <Divider />

      <Segment.Group horizontal>
        <Segment basic>
          <div style={{ marginBottom: 15, padding: 5 }}>
            <Header as="h4" style={{ color: "lightgrey" }}>
              <Header.Content>Tournament title</Header.Content>
            </Header>
            <Input
              onChange={(event, data) => {
                setTournamentTitle(data.value);
              }}
              fluid
              value={tournamentTitle}
              className="settingInput"
            />
            <div className="settingLabel">
              remember to keep the tournament title simple and searchable, don't
              include any bad words :(
            </div>
          </div>
          <div style={{ marginBottom: 15, padding: 5 }}>
            <Header as="h4" style={{ color: "lightgrey" }}>
              <Header.Content>Tournament Description</Header.Content>
            </Header>
            <Form>
              <TextArea
                rows={
                  tournamentDescription.split("\n").length > 10
                    ? 11
                    : tournamentDescription.split("\n").length + 1
                }
                onChange={(event, data) => {
                  setTournamentDescription(data.value);
                }}
                value={tournamentDescription}
                className="settingTextArea"
              />
            </Form>
            <div className="settingLabel">
              describe your tournament and include any rules that players might
              need to read
            </div>
          </div>

          <div style={{ marginBottom: 15, padding: 5 }}>
            <Button onClick={handleTournamentUpdate} primary loading={loading}>
              Update Tournament
            </Button>
            <div className="settingLabel">
              update any changes to the tournament title or description
            </div>
          </div>

          <Divider section />

          <div style={{ marginBottom: 15, padding: 5 }}>
            <Header as="h4" style={{ color: "lightgrey" }}>
              <Header.Content>Tournament Progression</Header.Content>
            </Header>
            <Button
              onClick={handleTournamentProgress}
              disabled={tournament.state === states.END}
              color={
                tournament.state === states.JOIN
                  ? "green"
                  : tournament.state === states.PLAY
                  ? "red"
                  : ""
              }
            >
              {tournament.state === states.JOIN
                ? "Start Tournament"
                : tournament.state === states.PLAY
                ? "End Tournament"
                : "Tournament Finished"}
            </Button>
            {/* <TournamentStateDisplayGroup tournament={tournament} /> */}
            <div className="settingLabel">
              you can progress the tournament here
            </div>
          </div>
        </Segment>

        <Segment></Segment>
      </Segment.Group>
    </Segment.Group>
  );
}
