import React from "react";

import Match from "./Match";

export default function Round({ roundData, roundIndex, tournamentMatchData }) {
  const polylineStyle = { fill: "none", stroke: "white", strokeWidth: 4 };
  const MatchHeight = 60;
  const MatchWidth = 225;
  const distanceBetweenRounds = 80;
  const paddingBetweenMatches = 15;
  return (
    <g>
      {roundData.matches.map((matchData, matchIndex) => {
        const ThisX = roundIndex * (distanceBetweenRounds + MatchWidth);

        const dynamicViewSpace =
          paddingBetweenMatches * Math.pow(2, roundData.round + 2);

        const paddingFromTop =
          MatchHeight * ((Math.pow(2, roundData.round) - 2) / 2);

        const distanceBetweenMatches = dynamicViewSpace * matchIndex;

        const ThisY = paddingFromTop + distanceBetweenMatches;

        return (
          <g>
            <Match
              width={MatchWidth}
              height={MatchHeight}
              match={matchData}
              ThisX={ThisX}
              ThisY={ThisY}
            />
            {matchIndex % 2 === 0 &&
            roundData.round !== tournamentMatchData.length ? (
              <polyline
                points={`
                    ${ThisX + MatchWidth + 5},${ThisY + MatchHeight / 2} 
                    ${ThisX + MatchWidth + distanceBetweenRounds / 2},${
                  ThisY + MatchHeight / 2
                } 
                    ${ThisX + MatchWidth + distanceBetweenRounds / 2},${
                  ThisY + dynamicViewSpace * 1 + MatchHeight / 2
                } 
                    ${ThisX + MatchWidth + 5},${
                  ThisY + dynamicViewSpace * 1 + MatchHeight / 2
                }
                `}
                style={polylineStyle}
              />
            ) : null}
            {roundData.round !== 1 ? (
              <polyline
                points={`
                    ${ThisX - 5},${ThisY + MatchHeight / 2} 
                    ${ThisX - distanceBetweenRounds / 2},${
                  ThisY + MatchHeight / 2
                }
                `}
                style={polylineStyle}
              />
            ) : null}
          </g>
        );
      })}
    </g>
  );
}
