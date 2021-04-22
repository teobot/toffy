import React, { useEffect, useState, useContext } from "react";

import { useHistory, useParams } from "react-router";

import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Image,
  Label,
  Segment,
} from "semantic-ui-react";

import toffy from "../api/toffy";

import calculateCreated from "../functions/calculateCreated";

import ChartSegment from "../components/User/ChartSegment";

import { LoggedInContext } from "../context/LoggedInContext";
import { ToastContext } from "../context/ToastContext";
import { WindowContext } from "../context/WindowContext";

export default function UserScreen() {
  let { _id } = useParams();

  const [user, setUser] = useState(null);

  let history = useHistory();

  const { windowHeight } = useContext(WindowContext);
  const { user_id } = useContext(LoggedInContext);
  const { showToast } = useContext(ToastContext);

  useEffect(() => {
    getUserInformation();
  }, [_id]);

  const getUserInformation = async () => {
    // This method gathers the user information
    try {
      const user = await toffy.get(`/user/${_id}`);
      setUser(user.data);
    } catch (error) {
      // : error getting the user information
      showToast("error", error.response.data.error);
      // Force the user back
      history.push("/home");
    }
  };

  if (!user) {
    // User information is loading
    return (
      <Container>
        <Header>Loading...</Header>
      </Container>
    );
  } else {
    // User information is finished loading
    return (
      <div>
        <div
          style={{
            width: "100%",
            height: windowHeight / 5,
            background: "rgb(10,67,149)",
            background:
              "linear-gradient(90deg, rgba(10,67,149,1) 0%, rgba(0,255,89,1) 100%)",
          }}
        />
        <Segment basic className="container">
          <Grid>
            <Grid.Row>
              <Grid.Column width={8}>
                <Header inverted size="huge">
                  <Image circular src={user.profile_pic} />
                  <Header.Content>
                    {user.username}
                    <Header.Subheader>
                      Joined {calculateCreated(user.date_joined)}{" "}
                      <Label>Elo: {user.elo}</Label>
                    </Header.Subheader>
                  </Header.Content>
                </Header>
              </Grid.Column>
              <Grid.Column width={8}>
                {user._id === user_id ? (
                  <Button
                    as="a"
                    href={`/u/${_id}/edit`}
                    primary
                    floated="right"
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <Button floated="right">Message</Button>
                )}
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Divider section hidden />

          <Grid stackable doubling stretched>
            <Grid.Row columns="equal">
              <Grid.Column>
                <Header inverted size="large">
                  Overall Stats
                </Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row stretched>
              {[
                {
                  title: "Total tournaments organized",
                  value: user.tournaments_organized,
                },
                {
                  title: "Total matches played",
                  value: user.matches_played.length,
                },
                {
                  title: "Total tournaments participated",
                  value: user.total_tournaments_played,
                },
                {
                  title: "Total matches won",
                  value: user.matches_won,
                },
              ].map((obj) => {
                return (
                  <Grid.Column
                    computer={4}
                    largeScreen={4}
                    widescreen={4}
                    tablet={8}
                    mobile={16}
                  >
                    <Segment inverted padded textAlign="center">
                      <Header inverted style={{ fontSize: 38 }}>
                        {obj.value}
                      </Header>
                      <Header.Subheader style={{ color: "grey" }}>
                        {obj.title}
                      </Header.Subheader>
                    </Segment>
                  </Grid.Column>
                );
              })}
            </Grid.Row>

            <Divider hidden />

            <Grid.Row columns="equal">
              <Grid.Column>
                <Header inverted size="large">
                  Games and Matches
                </Header>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width={8}>
                <div>
                  <Header inverted size="medium" attached="top">
                    Overall Win Rate
                  </Header>
                  <Segment inverted attached padded>
                    <ChartSegment
                      userData={user}
                      centerItem={{
                        top: `${user.win_percentage * 100}%`,
                        bottom: "Win rate",
                      }}
                      id="matchesChartId"
                      itemLeft={{
                        title: "Wins",
                        value: user.matches_won,
                        color: "#3ec47b",
                      }}
                      itemRight={{
                        title: "Losses",
                        value: user.matches_lost,
                        color: "#f95b5c",
                      }}
                    />
                  </Segment>
                </div>
              </Grid.Column>
              <Grid.Column width={8}>
                <div>
                  <Header inverted size="medium" attached="top">
                    Tournaments
                  </Header>
                  <Segment inverted attached padded>
                    <ChartSegment
                      userData={user}
                      centerItem={null}
                      id="tournamentChartId"
                      itemLeft={{
                        title: "Organized",
                        value: user.tournaments_organized,
                        color: "#00365F",
                      }}
                      itemRight={{
                        title: "Participated",
                        value: user.total_tournaments_played,
                        color: "#2D9CF1",
                      }}
                    />
                  </Segment>
                </div>
              </Grid.Column>
            </Grid.Row>

            <Divider hidden />

            <Grid.Row columns="equal">
              <Grid.Column>
                <Header inverted size="large">
                  Recent Games
                </Header>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns="equal">
              <Grid.Column>
                {user.matches_played.map((match) => {
                  return (
                    <Segment
                      inverted
                      floated
                      style={{
                        borderTop: `1px solid ${
                          match.winner
                            ? match.winner._id === _id
                              ? "green"
                              : "red"
                            : "yellow"
                        }`,
                        margin: "5px 0px",
                      }}
                    >
                      <Header style={{ margin: 0, padding: 0 }}>
                        {match.player1.player
                          ? match.player1.player.username
                          : "TBA"}{" "}
                        vs{" "}
                        {match.player2.player
                          ? match.player2.player.username
                          : "TBA"}
                      </Header>
                      <Label
                        color={
                          match.winner
                            ? match.winner._id === _id
                              ? "green"
                              : "red"
                            : "yellow"
                        }
                        attached="top right"
                      >
                        {match.winner
                          ? match.winner._id === _id
                            ? "WON"
                            : "LOST"
                          : "IN PROGRESS"}
                      </Label>
                    </Segment>
                  );
                })}
                {user.matches_played.length === 0 ? (
                  <Segment
                    inverted
                    floated
                    style={{
                      borderTop: `1px solid red`,
                      margin: "5px 0px",
                    }}
                  >
                    <Header>No Matches Played</Header>
                  </Segment>
                ) : null}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    );
  }
}
