import React, { useState, useContext } from "react";

import { Icon } from "semantic-ui-react";

import Player from "./Player";

import { TournamentContext } from "../FreeForAllDisplay";

export default function Match({ players, round_index, round }) {
  const { isAdmin, inProgress, updateRound } = useContext(TournamentContext);

  const height = players.length * 25;

  const [editHover, setEditHover] = useState(false);

  const showEditor = isAdmin && !round.finished && inProgress;

  return (
    <div
      style={{
        marginRight: 60,
        marginLeft: 20,
        height: height,
        width: 200,
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
          top: height / 2 - 10,
          left: -18,
          fontSize: 12,
          color: "white",
        }}
      >
        {round_index}
      </span>

      {[...players]
        .sort(function (a, b) {
          if (a.position > b.position) {
            return 1;
          } else {
            return -1;
          }
        })
        .map((player) => {
          return <Player player_length={players.length} player_data={player} />;
        })}

      {showEditor ? (
        <div
          style={{
            position: "absolute",
            top: 0,
            right: -45,
            bottom: 0,
            height: "100%",
            width: 45,
            backgroundColor: "#23252d",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: 5,
          }}
          onClick={() => {
            updateRound(round);
          }}
        >
          <Icon
            onMouseEnter={() => {
              setEditHover(true);
            }}
            onMouseLeave={() => {
              setEditHover(false);
            }}
            style={{
              fontSize: 24,
              padding: 0,
              margin: 0,
              color: "#929499",
              cursor: "pointer",
            }}
            name={`edit ${!editHover ? "outline" : ""}`}
          />
        </div>
      ) : null}
    </div>
  );
}
