import React, { useContext, useEffect, useState } from "react";

import { useHistory } from "react-router";

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

import { WindowContext } from "../context/WindowContext";
import { ToastContext } from "../context/ToastContext";

import banner from "../img/widescreen-021.jpg";

import TournamentSearchCard from "../components/Tournament/TournamentSearch/TournamentSearchCard";

export default function HomeScreen() {
  const [results, setResults] = useState(null);

  let history = useHistory();

  const { windowWidth, windowHeight } = useContext(WindowContext);
  const { showToast } = useContext(ToastContext);

  useEffect(() => {
    getTournamentList();
  }, []);

  const getTournamentList = async () => {
    try {
      const r = await toffy.get("/find");
      setResults(r.data);
    } catch (error) {
      // : error getting the tournament list data
      showToast("error", "Failed to retrieve data, please try again later");
    }
  };

  const tournamentSearchDisplay = (
    <Grid.Column
      computer={5}
      largeScreen={5}
      mobile={16}
      widescreen={5}
      tablet={5}
      width={5}
    >
      <Segment.Group>
        <Segment inverted>All</Segment>
        <Segment inverted>Joining</Segment>
        <Segment inverted>In Progress</Segment>
        <Segment inverted>Ended</Segment>
      </Segment.Group>
    </Grid.Column>
  );

  return (
    <>
      <div style={{ padding: 0, margin: 0, position: "relative" }}>
        <div
          className="image-back fade-image"
          style={{
            backgroundImage: `url(${banner})`,
            height: windowHeight / 4,
            width: "100%",
          }}
        />
        <Button
          color="orange"
          style={{
            position: "absolute",
            top: windowHeight / 10,
            right: 50,
          }}
          as="a"
          href="/create/tournament"
          size="big"
        >
          CREATE TOURNAMENT
        </Button>
      </div>

      <Divider hidden section />

      <Grid container padded="vertically" stackable inverted>
        <Grid.Row>
          {windowWidth <= 768 ? tournamentSearchDisplay : null}
          <Grid.Column
            computer={11}
            largeScreen={11}
            mobile={16}
            widescreen={11}
            tablet={11}
            width={11}
          >
            {results ? (
              <Segment.Group>
                {results.map((result, index) => {
                  return (
                    <TournamentSearchCard result={result} history={history} />
                  );
                })}
              </Segment.Group>
            ) : (
              <Segment basic>
                <Header inverted>
                  <Header.Content>No Results</Header.Content>
                </Header>
              </Segment>
            )}
          </Grid.Column>
          {windowWidth > 768 ? tournamentSearchDisplay : null}
        </Grid.Row>
      </Grid>
    </>
  );
}
