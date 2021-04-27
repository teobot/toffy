import React, { useContext, useState } from "react";

import { Icon } from "semantic-ui-react";

import { TournamentContext } from "../SwissDisplaySegment";

function Player({ player_data, top, winner, editable, match }) {
  const { player, score } = player_data;

  const usernameContainerStyle = {
    height: "100%",
    width: "85%",
    backgroundColor: "#58595e",
    color: "white",
    fontSize: 14,
    padding: "2px 5px",
  };
  const scoreContainerStyle = {
    height: "100%",
    width: "15%",
    backgroundColor: winner ? "#ff7324" : "#77777f",
    color: "black",
    fontSize: 14,
    textAlign: "center",
    padding: "3px 0",
  };
  return (
    <div
      style={{
        width: "100%",
        height: "50%",
        backgroundColor: "#58595e",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: 2,
        alignItems: "center",
        ...(top ? { borderBottom: "1px solid black" } : {}),
      }}
    >
      <div className="text-shadow" style={usernameContainerStyle}>
        {player ? player.username : ""}
      </div>
      <div style={scoreContainerStyle}>{score ? score : ""}</div>
    </div>
  );
}

export default function Match({ match }) {
  const { player1, player2, winner } = match;

  const { isAdmin, inProgress, changeSelectedMatch } = useContext(
    TournamentContext
  );

  const [hover, setHover] = useState(false);

  return (
    <div
      style={{
        marginRight: 60,
        marginLeft: 20,
        minWidth: 200,
        minHeight: 50,
        height: 50,
        width: 200,
        maxHeight: 200,
        maxWidth: 50,
        backgroundColor: "lightgreen",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: 2,
        position: "relative",
      }}
    >
      <span
        style={{
          position: "absolute",
          top: 15,
          left: -18,
          fontSize: 12,
          color: "white",
        }}
      >
        {match.match_id}
      </span>
      <Player
        match={match}
        editable={isAdmin && inProgress}
        winner={
          winner
            ? player1.player
              ? player1.player._id === winner._id
              : false
            : false
        }
        top={true}
        player_data={player1}
      />
      <Player
        match={match}
        editable={isAdmin && inProgress}
        winner={
          winner
            ? player2.player
              ? player2.player._id === winner._id
              : false
            : false
        }
        top={false}
        player_data={player2}
      />

      {isAdmin &&
      inProgress &&
      player1.player !== null &&
      player2.player !== null &&
      winner === null ? (
        <div
          style={{
            position: "absolute",
            backgroundColor: "#58595e",
            right: 0,
            bottom: 0,
            top: 0,
            width: 50,
            height: 50,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 25,
            color: "#2a303f",
            cursor: "pointer",
          }}
          onMouseEnter={() => {
            setHover(true);
          }}
          onMouseLeave={() => {
            setHover(false);
          }}
          onClick={() => {
            changeSelectedMatch(match);
          }}
        >
          <Icon fitted name={`edit ${!hover ? "outline" : ""}`} />
        </div>
      ) : null}
    </div>
  );
}
