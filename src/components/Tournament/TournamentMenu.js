import React, { useContext } from "react";
import { useHistory } from "react-router";

import { Menu, Icon } from "semantic-ui-react";

import { WindowContext } from "../../context/WindowContext";

export default function TournamentMenu({ messages, isAdmin, _id, view }) {
  const { windowWidth, windowHeight } = useContext(WindowContext);

  let history = useHistory();
  return (
    <Menu
      id="tournamentMenu"
      pointing
      secondary
      inverted
      fluid
      vertical={windowWidth < 650}
      style={{ fontSize: 16, marginTop: 15 }}
    >
      {[
        { name: "Bracket", view: undefined, icon: null },
        { name: "Players", view: "players", icon: null },
        ...(isAdmin
          ? [
              {
                name: `Messages (${messages.length})`,
                view: "messages",
                icon: (
                  <Icon size="small" style={{ color: "white" }} name="unlock" />
                ),
              },
              {
                name: "Settings",
                view: "settings",
                icon: (
                  <Icon size="small" style={{ color: "white" }} name="unlock" />
                ),
              },
            ]
          : []),
      ].map((menuItem) => {
        if (!menuItem) {
          return null;
        }
        return (
          <Menu.Item
            as="a"
            onClick={() => {
              history.push(
                `/tournament/${_id}${menuItem.view ? `/${menuItem.view}` : ""}`
              );
            }}
            active={view === menuItem.view}
          >
            {menuItem.icon ? menuItem.icon : null}
            {menuItem.name}
          </Menu.Item>
        );
      })}
    </Menu>
  );
}
