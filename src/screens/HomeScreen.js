import React, { useContext, useEffect, useState } from "react";

import { useHistory } from "react-router";

import { Button, Divider, Grid, Segment } from "semantic-ui-react";

import toffy from "../api/toffy";

import { WindowContext } from "../context/WindowContext";
import { ToastContext } from "../context/ToastContext";

import banner from "../img/widescreen-021.jpg";

import TournamentSearchCard from "../components/Tournament/TournamentSearch/TournamentSearchCard";

import { states } from "../components/Tournament/TournamentConfig";

export default function HomeScreen() {
  const resultSort = [
    {
      state: "/",
      title: "All",
    },
    {
      state: states.JOIN,
      title: "Players Joining",
    },
    {
      state: states.PLAY,
      title: "In Progress",
    },
    {
      state: states.END,
      title: "Ended",
    },
  ];
  const [results, setResults] = useState([]);
  const [playerResults, setPlayerResults] = useState([]);
  const [sortingBy, setSortingBy] = useState(resultSort[0]);
  const [playerJoinedSort, setPlayerJoinedSort] = useState(false);

  let history = useHistory();

  const { windowWidth, windowHeight } = useContext(WindowContext);
  const { showToast } = useContext(ToastContext);

  useEffect(() => {
    getTournamentList();
    getPlayerJoinedTournaments();
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

  const getPlayerJoinedTournaments = async () => {
    try {
      const r = await toffy.get("/find/joined");
      setPlayerResults(r.data);
    } catch (error) {
      // : error getting the tournament list data
      showToast("error", "Failed to retrieve data, please try again later");
    }
  };

  const getNumberOfTournamentType = (state) => {
    if (state === "/") {
      return results.length;
    }
    let num = 0;
    for (let i = 0; i < results.length; i++) {
      if (results[i].state === state) {
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
            <Grid.Row
              onClick={() => {
                setSortingBy(search);
                setPlayerJoinedSort(false);
              }}
              className="sort-row"
              columns="equal"
              style={{
                color: "lightgrey",
                fontSize: 12,
                ...(sortingBy.title === search.title
                  ? { backgroundColor: "#121212" }
                  : {}),
              }}
            >
              <Grid.Column textAlign="left">{search.title}</Grid.Column>
              <Grid.Column textAlign="right">{`(${getNumberOfTournamentType(
                search.state
              )})`}</Grid.Column>
            </Grid.Row>
          );
        })}
        <Divider />
        <Grid.Row
          onClick={() => {
            setSortingBy({
              state: "",
              title: "",
            });
            setPlayerJoinedSort(true);
          }}
          className="sort-row"
          columns="equal"
          style={{
            color: "lightgrey",
            fontSize: 12,
            ...(playerJoinedSort ? { backgroundColor: "#121212" } : {}),
          }}
        >
          <Grid.Column textAlign="left">Joined</Grid.Column>
          <Grid.Column textAlign="right">{`(${playerResults.length})`}</Grid.Column>
        </Grid.Row>
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
            <Segment.Group>
              {playerJoinedSort ? (
                playerResults.length > 0 ? (
                  playerResults.map((result, index) => {
                    return (
                      <TournamentSearchCard result={result} history={history} />
                    );
                  })
                ) : (
                  <Segment inverted textAlign="center">
                    No results were found.
                  </Segment>
                )
              ) : results.length > 0 ? (
                results.map((result, index) => {
                  if (sortingBy.state !== "/") {
                    if (sortingBy.state !== result.state) {
                      return null;
                    }
                  }
                  return (
                    <TournamentSearchCard result={result} history={history} />
                  );
                })
              ) : (
                <Segment inverted textAlign="center">
                  No results were found.
                </Segment>
              )}
            </Segment.Group>
          </Grid.Column>
          {windowWidth > 768 ? tournamentSearchDisplay : null}
        </Grid.Row>
      </Grid>
    </>
  );
}
