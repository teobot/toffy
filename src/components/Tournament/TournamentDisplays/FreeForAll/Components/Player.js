import React from "react";

const numberToDisplay = (i) => {
  var j = i % 10,
    k = i % 100;
  if (j === 1 && k !== 11) {
    return i + "st";
  }
  if (j === 2 && k !== 12) {
    return i + "nd";
  }
  if (j === 3 && k !== 13) {
    return i + "rd";
  }
  return i + "th";
};

export default function Player({ player_data, player_length }) {
  const { player } = player_data;
  const usernameContainerStyle = {
    height: "100%",
    width: "85%",
    backgroundColor: "#58595e",
    color: "white",
    fontSize: 12,
    padding: "3px 5px",
  };
  const scoreContainerStyle = {
    height: "100%",
    width: "15%",
    backgroundColor: player_data.position === 1 ? "#ff7324" : "#77777f",
    color: "black",
    fontSize: 12,
    textAlign: "center",
    padding: "3px 0",
  };
  return (
    <div
      style={{
        width: "100%",
        height: `${100 / player_length}%`,
        backgroundColor: "#58595e",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: 2,
        alignItems: "center",
        borderBottom: "1px solid black",
      }}
    >
      <div className="text-shadow" style={usernameContainerStyle}>
        {player ? player.username : ""}
      </div>
      <div style={scoreContainerStyle}>
        {player_data.position ? numberToDisplay(player_data.position) : ""}
      </div>
    </div>
  );
}
