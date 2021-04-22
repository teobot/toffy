import React, { useEffect, useState, useContext } from "react";

import { Button, Grid, Header, Image, Segment } from "semantic-ui-react";

import widescreen from "../img/widescreen-014.jpg";
import elowidescreen from "../img/widescreen-015.jpg";
import tournamentypes from "../img/widescreen-016.jpg";
import legendwidescreen from "../img/widescreen-017.jpg";
import signupwidescreen from "../img/widescreen-018.jpg";

import { WindowContext } from "../context/WindowContext";

import toffy from "../api/toffy";

export default function LandingScreen() {
  let { windowWidth, windowHeight } = useContext(WindowContext);

  const [stats, setStats] = useState(null);

  const imageCoverStyle = {
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
  };

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const getStats = async () => {
    // Get the toffy stats
    try {
      const res = await toffy.get("/stat/user");
      setStats(res.data);
    } catch (error) {
      // : Error getting stats
      await delay(20000);
      getStats();
    }
  };

  useEffect(() => {
    getStats();
  }, []);

  return (
    <>
      <div
        style={{
          width: "100%",
          height: windowHeight * 0.7,
          backgroundImage: `url(${widescreen})`,
          ...imageCoverStyle,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Segment basic textAlign="center">
          <Header
            style={{
              fontSize: 45 + windowWidth / 40,
              textShadow: "3px 1px black",
            }}
            inverted
          >
            <Image circular src="https://react.semantic-ui.com/logo.png" />
            <Header.Content>
              Toffy
              <Header.Subheader
                style={{
                  color: "orange",
                  fontSize: 18 + windowWidth / 400,
                  fontWeight: 900,
                }}
              >
                tournaments made simple
              </Header.Subheader>
            </Header.Content>
          </Header>
        </Segment>
      </div>

      <Segment basic>
        <Grid style={{ padding: "30px 0px" }} stretched>
          <Grid.Row stretched>
            {[
              {
                title: "Total tournaments organized",
                value: stats ? stats.tournament_count : "...",
              },
              {
                title: "Users Signed Up",
                value: stats ? stats.user_count : "...",
              },
              {
                title: "Total Matches Played",
                value: stats ? stats.matches_count : "...",
              },
              {
                title: "Total Rounds Played",
                value: stats ? stats.round_count : "...",
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
                  <Segment
                    basic
                    textAlign="center"
                    style={{ padding: "25px 0px" }}
                  >
                    <Header inverted style={{ fontSize: 42 }}>
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
        </Grid>
      </Segment>

      <Grid>
        {[
          {
            image: elowidescreen,
            headerContent: (
              <Header.Content>
                Elo Scoring
                <Header.Subheader>
                  Each player is ranked using the ELO system, making tournaments
                  fairer with less effort.
                </Header.Subheader>
              </Header.Content>
            ),
          },
          {
            image: tournamentypes,
            headerContent: (
              <Header.Content>
                Multiple Types
                <Header.Subheader>
                  Toffy includes a range of different tournament types,
                  including single elimination and leaderboards.
                </Header.Subheader>
              </Header.Content>
            ),
          },
          {
            image: legendwidescreen,
            headerContent: (
              <Header.Content>
                Super simple UI
                <Header.Subheader>
                  The simple UI delivers all the information you need and
                  nothing else.
                </Header.Subheader>
              </Header.Content>
            ),
          },
        ].map((displayRow, index) => {
          const GridCol = (
            <Grid.Column
              computer={8}
              largeScreen={8}
              widescreen={8}
              tablet={8}
              mobile={16}
            >
              <Image src={displayRow.image} fluid />
            </Grid.Column>
          );
          return (
            <Grid.Row stretched>
              {index % 2 !== 0 ? GridCol : null}
              <Grid.Column
                computer={8}
                largeScreen={8}
                widescreen={8}
                tablet={8}
                mobile={16}
              >
                <Segment
                  padded
                  basic
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Header inverted size="large" textAlign="center">
                    {displayRow.headerContent}
                  </Header>
                </Segment>
              </Grid.Column>
              {index % 2 === 0 ? GridCol : null}
            </Grid.Row>
          );
        })}
      </Grid>

      <div
        style={{
          width: "100%",
          height: windowHeight * 0.4,
          backgroundColor: "lightblue",
          backgroundImage: `url(${signupwidescreen})`,
          ...imageCoverStyle,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 25,
        }}
      >
        <Segment basic textAlign="center">
          <Header
            style={{
              fontSize: 25 + windowWidth / 40,
              textShadow: "3px 1px black",
            }}
            inverted
          >
            <Header.Content>
              Join Today
              <Header.Subheader
                style={{
                  color: "orange",
                  fontSize: 18 + windowWidth / 400,
                  fontWeight: 900,
                }}
              >
                <Button
                  as="a"
                  href="/create/account"
                  color="orange"
                  compact
                  size="large"
                >
                  FREE SIGN UP
                </Button>
              </Header.Subheader>
            </Header.Content>
          </Header>
        </Segment>
      </div>
    </>
  );
}
