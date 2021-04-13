import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Button, Divider, Header, List } from "semantic-ui-react";

import toffy from "../api/toffy";

export default function HomeScreen() {
  const [results, setResults] = useState([]);
  let history = useHistory();
  useEffect(() => {
    getTournamentList();
  }, []);

  const getTournamentList = async () => {
    try {
      const r = await toffy.get("/find");
      setResults(r.data);
      // console.log(r.data);
    } catch (error) {
      // TODO: error getting the tournament list data
      console.log(error);
    }
  };

  if (results.length < 1) {
    // TODO: need to add loading screen here
    return <Header>Loading</Header>;
  } else {
    return (
      <div>
        <Header h1>Home Screen</Header>
        <Divider />
        <List divided>
          {results.map(({ state, title, type, _id }) => {
            return (
              <List.Item
                onClick={() => {
                  history.push(`/tournament/${_id}`);
                }}
              >
                <List.Icon name="world" />
                <List.Content>
                  <List.Header as="a">{title}</List.Header>
                  <List.Description>
                    {type} - <small>{state}</small>
                  </List.Description>
                </List.Content>
              </List.Item>
            );
          })}
        </List>
      </div>
    );
  }
}
