import React, { useContext } from "react";

import { Button } from "semantic-ui-react";

import toffy from "../../../api/toffy";

import { LoggedInContext } from "../../../context/LoggedInContext";
import { ToastContext } from "../../../context/ToastContext";

export default function UserPlayingButtonGroup({
  tournamentData,
  getTournamentData,
}) {
  const { players, state, _id } = tournamentData;

  const { user_id } = useContext(LoggedInContext);

  const { showToast } = useContext(ToastContext);

  const handlePlayerJoin = async () => {
    //   Handle the user wanting to join the tournament
    try {
      const r = await toffy.post(`/tournament/${_id}/join`);
      showToast("success", "You have joined the tournament.");
      await getTournamentData();
    } catch (error) {
      // : player failed to join
      showToast("error", "Failed to join tournament.");
    }
  };

  const handlePlayerLeave = async () => {
    //   Handle the player wanting to leave the tournament
    try {
      const r = await toffy.delete(`/tournament/${_id}/leave`);
      showToast("info", "You left the tournament.");
      await getTournamentData();
    } catch (error) {
      // : player failed to leave the tournament
      showToast("error", "Failed to leave tournament.");
    }
  };

  const checkIfUserInsidePlayers = () => {
    // This function returns true if the player is playing in the tournament
    for (let i = 0; i < players.length; i++) {
      const player = players[i];
      if (player._id === user_id) {
        return true;
      }
    }
  };

  if (state === "Joining") {
    return checkIfUserInsidePlayers() ? (
      <Button negative onClick={handlePlayerLeave}>
        Leave
      </Button>
    ) : (
      <Button positive onClick={handlePlayerJoin}>
        Join
      </Button>
    );
  } else {
    //   Tournament is either in playing or ending
    return null;
  }
}
