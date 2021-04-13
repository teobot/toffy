import React, { useRef, useEffect, createContext, useState } from "react";
import {
  List,
  Segment,
  Label,
  Divider,
  Container,
  Table,
  Grid,
  Header,
  Modal,
  Image,
  Button,
} from "semantic-ui-react";

import { TOOL_AUTO, UncontrolledReactSVGPanZoom } from "react-svg-pan-zoom";

import useWindowWidth from "../../../../functions/useWindowWidth";

import Round from "./components/Round";
import { set } from "js-cookie";
import { Model } from "react-tournament-bracket";

export const TournamentContext = createContext();

// TODO: After testing add this prop `match_data,`
export default function RobinRoundDisplay({ match_data, isAdmin }) {
  const Viewer = useRef(null);
  const { windowWidth, windowHeight } = useWindowWidth();

  const [open, setOpen] = useState(false);
  const [modelMatch, setModelMatch] = useState(null);

  const UpdateMatchDetails = (match) => {
    // console.log(match);
    setModelMatch(match);
    setOpen(true);
  };

  useEffect(() => {
    Viewer.current.zoom(0, 0, 1);
  }, []);

  return (
    <TournamentContext.Provider value={{ isAdmin: true, UpdateMatchDetails }}>
      <Segment inverted>
        <UncontrolledReactSVGPanZoom
          background="#272a33"
          SVGBackground="#2b2b2b"
          tool={TOOL_AUTO}
          ref={Viewer}
          width="100%"
          height={windowHeight / 2}
          detectAutoPan={false}
          customMiniature={() => {
            return null;
          }}
          customToolbar={() => {
            return null;
          }}
        >
          <svg>
            {match_data.map((roundData, roundIndex) => {
              return (
                // TODO: the tournamentMatchData props needs to be changed to `matchData`
                <Round
                  roundData={roundData}
                  roundIndex={roundIndex}
                  tournamentMatchData={match_data}
                />
              );
            })}
          </svg>
        </UncontrolledReactSVGPanZoom>

        <Modal
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
        >
          <Modal.Header>Edit Match Details</Modal.Header>

          {modelMatch ? (
            <Modal.Content>
              <Header textAlign="center" size="huge">
                Who won?
              </Header>

              <Grid>
                <Grid.Row textAlign="center" columns="equal">
                  <Grid.Column>
                    <Button.Group size="huge">
                      <Button>{modelMatch.player1.player.username}</Button>
                      <Button.Or />
                      <Button>{modelMatch.player2.player.username}</Button>
                    </Button.Group>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Modal.Content>
          ) : null}

          <Modal.Actions>
            <Button negative onClick={() => setOpen(false)}>
              Close
            </Button>
            <Button
              content="Save Changes"
              labelPosition="right"
              icon="checkmark"
              onClick={() => setOpen(false)}
              positive
            />
          </Modal.Actions>
        </Modal>
      </Segment>
    </TournamentContext.Provider>
  );
}
