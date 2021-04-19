import React from "react";

import { Menu, Icon } from "semantic-ui-react";

export default function TournamentMenu({ isAdmin, _id, view }) {
  return (
    <Menu
      id="tournamentMenu"
      pointing
      secondary
      inverted
      style={{ fontSize: 16, marginTop: 15 }}
    >
      {[
        { name: "Bracket", view: undefined, icon: null },
        { name: "Players", view: "players", icon: null },
        isAdmin
          ? {
              name: "Settings",
              view: "settings",
              icon: (
                <Icon size="small" style={{ color: "white" }} name="unlock" />
              ),
            }
          : null,
      ].map((menuItem) => {
        if (!menuItem) {
          return null;
        }
        return (
          <Menu.Item
            as="a"
            href={`/tournament/${_id}${
              menuItem.view ? `/${menuItem.view}` : ""
            }`}
            active={view === menuItem.view}
            icon={menuItem.icon ? menuItem.icon : null}
            name={menuItem.name}
          />
        );
      })}
    </Menu>
  );
}
