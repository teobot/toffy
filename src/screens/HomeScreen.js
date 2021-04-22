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

import { states } from "../components/Tournament/TournamentConfig";

export default function HomeScreen() {
  const [results, setResults] = useState([]);

  let history = useHistory();

  const { windowWidth, windowHeight } = useContext(WindowContext);
  const { showToast } = useContext(ToastContext);

  const resultSort = [
    {
      type: "",
      title: "All",
    },
    {
      type: states.JOIN,
      title: "Joining",
    },
    {
      type: states.PLAY,
      title: "In Progress",
    },
    {
      type: states.END,
      title: "Ended",
    },
  ];

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

  const getNumberOfTournamentType = (type) => {
    let num = 0;
    for (let i = 0; i < results.length; i++) {
      if (results[i].type === type) {
        num++;
      }
    }
    return num;
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
      <Grid inverted stretched>
        {resultSort.map((search) => {
          return (
            <Grid.Row columns="equal">
              <Grid.Column textAlign="left">{search.title}</Grid.Column>
              <Grid.Column textAlign="right">{`(${getNumberOfTournamentType(
                search.type
              )})`}</Grid.Column>
            </Grid.Row>
          );
        })}
      </Grid>
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
          onClick={() => {
            history.push("/create/tournament");
          }}
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
            {results.length > 0 ? (
              <Segment.Group>
                {results.map((result, index) => {
                  return (
                    <TournamentSearchCard result={result} history={history} />
                  );
                })}
              </Segment.Group>
            ) : (
              <Segment inverted textAlign="center">
                No results were found.
              </Segment>
            )}
          </Grid.Column>
          {windowWidth > 768 ? tournamentSearchDisplay : null}
        </Grid.Row>
      </Grid>
    </>
  );
}
