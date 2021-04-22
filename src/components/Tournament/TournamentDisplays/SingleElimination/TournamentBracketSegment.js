import React, {
  useRef,
  useEffect,
  createContext,
  useState,
  useReducer,
  useContext,
} from "react";

import { Divider, Grid, Header, Modal, Button, Input } from "semantic-ui-react";

import { ToastContext } from "../../../../context/ToastContext";
import { WindowContext } from "../../../../context/WindowContext";

import { TOOL_AUTO, UncontrolledReactSVGPanZoom } from "react-svg-pan-zoom";

import Round from "./components/Round";

import toffy from "../../../../api/toffy";

export const TournamentContext = createContext();

const matchReducer = (state, action) => {
  switch (action.type) {
    case "change_player1Selected":
      return { ...state, player1Selected: true, player2Selected: false };
    case "change_player2Selected":
      return { ...state, player2Selected: true, player1Selected: false };
    case "change_player1Score":
      return { ...state, player1Score: action.payload };
    case "change_player2Score":
      return { ...state, player2Score: action.payload };
    case "reset":
      return {
        player1Selected: false,
        player2Selected: false,
        player1Score: 0,
        player2Score: 0,
      };
    default:
      return state;
  }
};

export default function RobinRoundDisplay({
  match_data,
  isAdmin,
  tournament_id,
  getTournamentData,
  inProgress,
}) {
  const Viewer = useRef(null);
  const { windowHeight } = useContext(WindowContext);
  const { showToast } = useContext(ToastContext);

  const [state, dispatch] = useReducer(matchReducer, {
    player1Selected: false,
    player2Selected: false,
    player1Score: 0,
    player2Score: 0,
  });

  const [open, setOpen] = useState(false);
  const [modelMatch, setModelMatch] = useState(null);

  const changeSelectedMatch = (Match) => {
    setModelMatch(Match);
    setOpen(true);
  };

  const handleInputChange = (event, data) => {
    dispatch({ type: `change_${data.name}`, payload: parseInt(data.value) });
  };

  const UpdateMatchDetails = async () => {
    try {
      const r = await toffy.patch(
        `/tournament/${tournament_id}/match/${modelMatch._id}`,
        {
          winner: state.player1Selected
            ? "player1"
            : state.player2Selected
            ? "player2"
            : null,
          scores: {
            player1: state.player1Score,
            player2: state.player2Score,
          },
        }
      );

      // Match update is successful
      setOpen(false);
      showToast("success", "Match updated.");
      await getTournamentData();
    } catch (error) {
      // : failed match update
      showToast("error", "Match update failed, try again later.");
    }
  };

  useEffect(() => {
    Viewer.current.zoom(150, 150, 0.7);
  }, []);

  return (
    <>
      <TournamentContext.Provider
        value={{ isAdmin, inProgress, changeSelectedMatch }}
      >
        <UncontrolledReactSVGPanZoom
          background="#24262e"
          SVGBackground="#24262e"
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
                <Round
                  roundData={roundData}
                  roundIndex={roundIndex}
                  tournamentMatchData={match_data}
                />
              );
            })}
          </svg>
        </UncontrolledReactSVGPanZoom>
      </TournamentContext.Provider>

      <Modal
        onClose={() => {
          dispatch({ type: "reset" });
          setOpen(false);
        }}
        onOpen={() => setOpen(true)}
        open={open}
      >
        <Modal.Header>Edit Match Details</Modal.Header>

        {modelMatch ? (
          <Modal.Content>
            <Header textAlign="center" size="huge">
              Who won?
            </Header>

            <Grid stretched>
              <Grid.Row columns="equal" stretched>
                <Grid.Column>
                  <Button
                    positive={state.player1Selected}
                    onClick={() => {
                      dispatch({
                        type: "change_player1Selected",
                      });
                    }}
                  >
                    {modelMatch.player1.player.username}
                  </Button>
                </Grid.Column>
                <Grid.Column width={2}></Grid.Column>
                <Grid.Column>
                  <Button
                    positive={state.player2Selected}
                    onClick={() => {
                      dispatch({
                        type: "change_player2Selected",
                      });
                    }}
                  >
                    {modelMatch.player2.player.username}
                  </Button>
                </Grid.Column>
              </Grid.Row>

              <Divider />
              <Grid.Row columns="equal" stretched>
                <Grid.Column>
                  <Input
                    fluid
                    label="Player 1 Score"
                    type="number"
                    name="player1Score"
                    value={state.player1Score}
                    onChange={handleInputChange}
                  />
                </Grid.Column>
                <Grid.Column width={2}></Grid.Column>
                <Grid.Column>
                  <Input
                    fluid
                    label="Player 2 Score"
                    type="number"
                    min={0}
                    max={9999}
                    name="player2Score"
                    value={state.player2Score}
                    onChange={handleInputChange}
                    labelPosition="right"
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Modal.Content>
        ) : null}

        <Modal.Actions>
          <Button
            negative
            onClick={() => {
              dispatch({ type: "reset" });
              setOpen(false);
            }}
          >
            Close
          </Button>
          <Button
            disabled={!state.player2Selected && !state.player1Selected}
            content="Save Changes"
            labelPosition="right"
            icon="checkmark"
            onClick={UpdateMatchDetails}
            positive
          />
        </Modal.Actions>
      </Modal>
    </>
  );
}
