import { useContext } from "react";
import { useDrag } from "react-dnd";

import { TournamentContext } from "../TournamentBracketSegment";

export default function Player({
  ThisX,
  ThisY,
  matchId,
  playerData,
  width,
  height,
  winner,
}) {
  const { isAdmin } = useContext(TournamentContext);
  const { score, player } = playerData;

  return (
    <g>
      {/* Text and Score Background */}
      <rect
        x={ThisX}
        y={ThisY}
        width={width}
        height={height / 2}
        style={{ fill: "#58595e" }}
      />

      {/* Username Text */}
      <text
        style={{
          fontSize: 14,
          fontWeight: "bold",
          fill: "white",
          filter: "drop-shadow( 3px 3px 2px rgba(0, 0, 0, .7))",
        }}
        x={ThisX + 10}
        y={ThisY + 20}
      >
        {player ? player.username : null}
      </text>

      {winner ? (
        <g>
          {/* Score container */}
          <rect
            x={ThisX + width - 35}
            y={ThisY}
            width={35}
            height={height / 2}
            style={{ fill: winner._id === player._id ? "#ff741f" : "#77777f" }}
          />

          {/* Score Text */}
          <text
            style={{
              fontSize: 14,
              fontWeight: "normal",
              fill: "black",
              filter: "drop-shadow( 1px 1px 1px rgba(0, 0, 0, .7))",
            }}
            x={ThisX + width - (17 + `${player ? score: ""}`.toString().length * 4)}
            y={ThisY + height / 3}
          >
            {player ? score : null}
          </text>
        </g>
      ) : null}
    </g>
  );
}
