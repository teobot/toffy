import React, { useEffect, useState } from "react";

import calculateCreated, {
  displayDate,
  displayState,
} from "../functions/calculateCreated";

import { useHistory, useParams } from "react-router";
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
  Menu,
  Segment,
  Tab,
} from "semantic-ui-react";

import toffy from "../api/toffy";

import UserPlayingButtonGroup from "../components/Tournament/TournamentControls/UserPlayingButtonGroup";
import AdminTools from "../components/Tournament/AdministrationTools/AdminTools";

import TournamentBracketSegment from "../components/Tournament/TournamentDisplays/SingleElimination/TournamentBracketSegment";
import LeaderboardSegment from "../components/Tournament/TournamentDisplays/LeaderBoard/LeaderboardSegment";

import {
  tournament_types,
  states,
} from "../components/Tournament/TournamentConfig";

import useWindowWidth from "../functions/useWindowWidth";
import TournamentPlayerDisplay from "../components/Tournament/TournamentDisplays/TournamentPlayerDisplay";
import TournamentMenu from "../components/Tournament/TournamentMenu";

export default function TournamentScreen() {
  let { _id, view } = useParams();

  let history = useHistory();

  const { windowWidth, windowHeight } = useWindowWidth();

  const [result, setResult] = useState(null);

  useEffect(() => {
    getTournamentData();
  }, []);

  const MatchDataDisplayComponent = (type, match_data, isAdmin) => {
    if (result.match_data === undefined || result.match_data.length === 0) {
      return (
        <>
          <Divider section hidden />
          <Segment padded basic textAlign="center" vertical>
            <Header as="h1" icon inverted>
              <Icon name="trophy" />
              Match has not started
              <Header.Subheader>
                Waiting for the admin to start.
              </Header.Subheader>
            </Header>
          </Segment>
        </>
      );
    }
    if (type === tournament_types.SINGLE_ELIMINATION) {
      return (
        <TournamentBracketSegment
          getTournamentData={getTournamentData}
          tournament_id={result._id}
          match_data={match_data}
          isAdmin={isAdmin}
          inProgress={result.state === states.PLAY}
        />
      );
    } else if (type === tournament_types.LEADERBOARD) {
      // If tournament type is a leaderboard
      return (
        <LeaderboardSegment
          getTournamentData={getTournamentData}
          tournament_id={result._id}
          match_data={match_data}
          isAdmin={isAdmin}
          settings={result.settings}
          inProgress={result.state === states.PLAY}
        />
      );
    }

    return null;
  };

  const checkTournamentView = (v) => {
    return v === view;
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

  if (result && view === "settings" && !result.isAdmin) {
    // User has tried to enter the settings screen but is not the admin
    history.push(`/tournament/${_id}`);
  }

  if (!result) {
    // result is null
    return <div>Loading</div>;
  } else {
    return (
      <>
        <div
          style={{
            width: "100%",
            height: windowHeight / 7,
            background: "rgb(235,212,217)",
            background:
              "linear-gradient(90deg, rgba(235,212,217,1) 14%, rgba(245,111,235,1) 71%, rgba(255,0,254,1) 100%)",
          }}
        />

        {/* This displays the title, type, creation time, desc and join/leave buttons in a sub component */}
        <div
          style={{ backgroundColor: "#3d4351", padding: "20px 0px 0px 0px" }}
        >
          <Container>
            <Grid doubling stackable>
              <Grid.Row>
                <Grid.Column width={13}>
                  <Segment.Group>
                    <Segment.Group horizontal>
                      <Segment basic style={{ backgroundColor: "transparent" }}>
                        <Header as="h1" inverted>
                          {result.title}
                        </Header>
                      </Segment>
                      <Segment
                        basic
                        style={{ backgroundColor: "transparent" }}
                        textAlign="right"
                      >
                        <UserPlayingButtonGroup
                          getTournamentData={getTournamentData}
                          tournamentData={result}
                        />
                      </Segment>
                    </Segment.Group>
                    <Segment.Group horizontal={windowWidth > 650}>
                      {[
                        {
                          title: `${result.players.length} Player${
                            result.players.length === 1 ? "" : "s"
                          }`,
                          icon: "user",
                        },
                        { title: result.type, icon: "trophy" },
                        {
                          title: displayState(result.state),
                          icon: "game",
                        },
                        {
                          title: displayDate(result.created),
                          icon: "calendar",
                        },
                      ].map((value) => {
                        return (
                          <Segment basic textAlign="left">
                            <Header inverted size="tiny">
                              <Icon size="tiny" fitted name={value.icon} />
                              <Header.Content>{value.title}</Header.Content>
                            </Header>
                          </Segment>
                        );
                      })}
                    </Segment.Group>
                  </Segment.Group>
                </Grid.Column>
                <Grid.Column width={3}>
                  <Segment
                    basic
                    style={{
                      display: "flex",
                      height: "100%",
                      alignItems: "center",
                    }}
                  >
                    <Header as="h2" inverted>
                      <Image circular src={result.creator.profile_pic} />
                      <Header.Content>
                        <Header.Subheader>
                          <div style={{ color: "white", fontSize: 14 }}>
                            Organized by
                          </div>
                          <a
                            href={`/u/${result.creator._id}`}
                            style={{
                              color: "orange",
                              fontWeight: "900",
                              textDecoration: "underline",
                            }}
                          >
                            {result.creator.username}
                          </a>
                        </Header.Subheader>
                      </Header.Content>
                    </Header>
                  </Segment>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
          <Container>
            <TournamentMenu isAdmin={result.isAdmin} _id={_id} view={view} />
          </Container>
        </div>

        <Container>
          {/* Administrator tools for the creator */}
          {checkTournamentView("settings") ? (
            result.isAdmin ? (
              <AdminTools
                tournament={result}
                getTournamentData={getTournamentData}
              />
            ) : null
          ) : null}

          {/* Display the match data to the user */}
          {checkTournamentView(undefined)
            ? MatchDataDisplayComponent(
                result.type,
                result.match_data,
                result.isAdmin
              )
            : null}

          {/* This displays the players in a grid */}
          {checkTournamentView("players") ? (
            <TournamentPlayerDisplay
              players={result.players}
              creator={result.creator}
            />
          ) : null}
        </Container>
      </>
    );
  }
}
