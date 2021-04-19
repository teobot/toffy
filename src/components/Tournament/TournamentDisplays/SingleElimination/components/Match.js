import Player from "./Player";

import { TournamentContext } from "../TournamentBracketSegment";
import { useContext } from "react";

import Edit from "../../../../img/edit";

export default function Match({ ThisX, ThisY, match, width, height }) {
  const polylineStyle = { fill: "none", stroke: "black", strokeWidth: 1 };
  const { isAdmin, changeSelectedMatch, inProgress } = useContext(
    TournamentContext
  );

  const isEditable =
    !match.winner &&
    isAdmin &&
    match.player1.player &&
    match.player2.player &&
    inProgress;

  const displayMatchId = false;

  return (
    <g>
      {/* Player Top */}
      <Player
        width={width}
        height={height}
        ThisX={ThisX}
        ThisY={ThisY}
        winner={match.winner}
        playerData={match.player1}
        matchId={match.match_id}
      />

      {/* Player Bottom */}
      <Player
        width={width}
        height={height}
        ThisX={ThisX}
        ThisY={ThisY + height / 2}
        winner={match.winner}
        playerData={match.player2}
        matchId={match.match_id}
      />

      {/* Line Between Players */}
      <polyline
        points={`
          ${ThisX},${ThisY + 30} 
          ${isEditable ? `${ThisX + width * 0.75}` : `${ThisX + width}`},${
          ThisY + 30
        }
        `}
        style={polylineStyle}
      />

      {/* Match Editing button for admins */}
      {isEditable ? (
        <g>
          <rect
            pointer-events="visible"
            style={{ fill: "none" }}
            onClick={() => {
              changeSelectedMatch(match);
            }}
            height={34}
            width={35}
            x={ThisX + width - 43}
            y={ThisY + 14}
          />
          <Edit
            color={"#2a303f"}
            height={22}
            width={22}
            x={ThisX + width - 40}
            y={ThisY + 15}
          />
        </g>
      ) : null}

      {/* Match Id text */}
      {displayMatchId ? (
        <>
          <circle
            cx={ThisX - 4}
            cy={ThisY - 4}
            r={14}
            style={{ fill: "lightgreen" }}
          />
          <text x={ThisX - 8} y={ThisY}>
            {match.match_id}
          </text>
          <circle
            cx={ThisX + width}
            cy={ThisY - 4}
            r={14}
            style={{ fill: "pink" }}
          />
          <text x={ThisX + width - 4} y={ThisY}>
            {match.next_match_id}
          </text>
        </>
      ) : null}
    </g>
  );
}
