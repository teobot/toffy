import React from "react";
import { Button, Container, Segment } from "semantic-ui-react";
import toffy from "../../../api/toffy";

export default function UserPlayingButtonGroup({
  tournamentData,
  getTournamentData,
}) {
  const {
    created,
    creator,
    description,
    isAdmin,
    listed,
    match_data,
    players,
    state,
    title,
    type,
    __v,
    _id,
    userId,
  } = tournamentData;

  const handlePlayerJoin = async () => {
    //   Handle the user wanting to join the tournament
    try {
      const r = await toffy.post(`/tournament/${_id}/join`);
      console.log(r);
      await getTournamentData();
    } catch (error) {
      // TODO: player failed to join
    }
  };

  const handlePlayerLeave = async () => {
    //   Handle the player wanting to leave the tournamnet
    try {
      const r = await toffy.delete(`/tournament/${_id}/leave`);
      console.log(r);
      await getTournamentData();
    } catch (error) {
      // TODO: player failed to leave the tournament
    }
  };

  const checkIfUserInsidePlayers = () => {
    // This function returns true if the player is playing in the tournament
    for (let i = 0; i < players.length; i++) {
      const player = players[i];
      if (player._id === userId) {
        return true;
      }
    }
  };

  if (state === "Joining") {
    return (
      <Container fluid textAlign="right">
        {checkIfUserInsidePlayers() ? (
          <Button negative onClick={handlePlayerLeave}>
            Leave
          </Button>
        ) : (
          <Button positive onClick={handlePlayerJoin}>
            Join
          </Button>
        )}
      </Container>
    );
  } else {
    //   Tournament is either in playing or ending
    return null;
  }
}

// DUMMY TOURNAMENT INFORMATION
// created: "2021-03-18T18:12:59.167Z"
// creator: {_id: "603bfe693c9ff5230c4aecbc", username: "bonfire"}
// description: "Global"
// isAdmin: false
// userId: "60551c3e3587235d184f3685"
// listed: true
// match_data: []
// players: []
// state: "Joining"
// title: "open-source Licensed Concrete Bacon"
// type: "Single Elimination"
// __v: 0
// _id: "6053982bbc068c03b4e9cd93"
//
// const {
//     created,
//     creator,
//     description,
//     isAdmin,
//     listed,
//     match_data,
//     players,
//     state,
//     title,
//     type,
//     __v,
//     _id,
//   } = tournamentData;
