import React, { useState, useContext, useEffect, useReducer } from "react";
import { useHistory } from "react-router";

import {
  Grid,
  Header,
  Divider,
  Button,
  Segment,
  Progress,
  Input,
} from "semantic-ui-react";

import { WindowContext } from "../context/WindowContext";
import { ToastContext } from "../context/ToastContext";

import topImage from "../img/widescreen-014.jpg";

import { tournament_decisions } from "../components/Tournament/TournamentConfig";

import toffy from "../api/toffy";

const reducer = (state, action) => {
  switch (action.type) {
    case "change_size":
      return { ...state, size: action.payload };
    case "change_time":
      return { ...state, time: action.payload };
    case "change_title":
      return { ...state, title: action.payload };
    case "change_compete":
      return { ...state, compete: action.payload };
    case "change_scoreTitle":
      return { ...state, scoreTitle: action.payload };
    case "change_pointsWin":
      return { ...state, pointsWin: action.payload };
    case "change_pointsLoss":
      return { ...state, pointsLoss: action.payload };
    case "change_rounds":
      return { ...state, rounds: action.payload };
    case "reset":
      return {
        ...state,
        size: "",
        time: "",
        title: "",
        compete: "",
        scoreTitle: "",
        pointsWin: 1,
        pointsLoss: 0,
        rounds: 1,
      };
    default:
      return state;
  }
};

export default function CreateTournamentSimple() {
  const [sideImageSize, setSideImageSize] = useState(152);

  const [questionIndex, setQuestionIndex] = useState(0);

  const [decidedTournamentType, setDecidedTournamentType] = useState(
    tournament_decisions.Swiss
  );

  const [state, dispatch] = useReducer(reducer, {
    size: "",
    time: "",
    title: "",
    compete: "",
    scoreTitle: "",
    pointsWin: 1,
    pointsLoss: 0,
    rounds: 1,
    description: "Be respectful, Be Fierce, Have Fun!",
  });

  let history = useHistory();

  const { showToast } = useContext(ToastContext);

  const { windowWidth, windowHeight } = useContext(WindowContext);

  useEffect(() => {
    setSideImageSize(
      Math.floor(document.getElementById("navbar").clientHeight)
    );
  }, []);

  const imageCoverStyle = {
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: `center center`,
  };

  const nextQuestion = () => {
    setQuestionIndex(
      questionIndex < questions.length - 1
        ? questionIndex + 1
        : questions.length - 1
    );
  };

  const prevQuestion = () => {
    setQuestionIndex(questionIndex > 0 ? questionIndex - 1 : 0);
  };

  const resetForm = () => {
    dispatch({ type: "reset", payload: null });
    setQuestionIndex(0);
  };

  const submitTournament = async () => {
    // This function submits the tournament to the backend
    try {
      // Send the request
      const response = await toffy.post("/create", {
        ...state,
        type: decidedTournamentType.type,
      });

      // Show success toast
      showToast("success", "Tournament Created!");

      // Push user to the tournament screen
      history.push(`/tournament/${response.data}`);
    } catch (error) {
      // : error in creating the tournament
      if (error.response.data.error.errors) {
        for (const [key, value] of Object.entries(
          error.response.data.error.errors
        )) {
          showToast("error", value.message);
        }
      } else {
        showToast("error", error.response.data.error);
      }
    }
  };

  useEffect(() => {
    if (state.size && state.time && state.title && state.compete) {
      decideTournamentType();
    }
  }, [state]);

  const decideTournamentType = () => {
    // state.size === "Large" || "Medium" || "Small"
    // state.time === "Slow" || "Normal" || "Fast"
    // state.compete === "PVP" || "PVE" || "PVEL"

    if (state.compete === "PVEL") {
      // Player VS Everyone (Leaderboard)
      return setDecidedTournamentType(tournament_decisions["Leaderboard"]);
    }

    if (state.compete === "PVE") {
      // Player VS Everyone (Leaderboard)
      return setDecidedTournamentType(tournament_decisions["Free For All"]);
    }

    if (state.compete === "PVP") {
      // Tournament type is player vs player
      // Swiss - SingleElim
      if (state.time === "Fast" && state.size === "Large") {
        // SingleElim
        return setDecidedTournamentType(
          tournament_decisions["Single Elimination"]
        );
      } else {
        // Swiss
        return setDecidedTournamentType(tournament_decisions["Swiss"]);
      }
    }
  };

  const tournamentTypeStyle = { fontSize: 16, padding: 2, margin: 2 };

  const questions = [
    {
      header: "Lets get started! 📚",
      content: (
        <>
          <Segment basic>
            <Header inverted size="medium">
              <Header.Content>
                Firstly, What is your tournament going to be named?
              </Header.Content>
            </Header>
            <Divider />
            <Input
              error={
                state.title.split("").length < 5 ||
                state.title.split("").length > 26
              }
              onChange={(event, data) => {
                dispatch({
                  type: "change_title",
                  payload: data.value,
                });
              }}
              className="settingInput"
              fluid
              size="massive"
              placeholder="Enter here..."
            />
            <Divider />
            <Segment clearing basic>
              {questionIndex > 0 ? (
                <Button floated="left" onClick={prevQuestion} negative>
                  back
                </Button>
              ) : null}
              <Button
                floated="right"
                onClick={nextQuestion}
                disabled={
                  !state.title ||
                  state.title.split("").length < 5 ||
                  state.title.split("").length > 26
                }
                color="orange"
              >
                Next
              </Button>
            </Segment>
          </Segment>
        </>
      ),
    },
    {
      header: "How big is the party? 🥳",
      content: (
        <>
          <Segment basic>
            <Header inverted size="medium">
              <Header.Content>
                How many players are you expecting?
              </Header.Content>
            </Header>
            <Divider />
            <div>
              <Button.Group
                widths="3"
                vertical
                size={windowWidth > 768 ? "massive" : "large"}
              >
                <Button
                  basic={state.size !== "Large"}
                  onClick={() => {
                    dispatch({ type: "change_size", payload: "Large" });
                  }}
                  color="green"
                >
                  🧑🏻‍🤝‍🧑🏻🧑🏻‍🤝‍🧑🏻 Lots (16+)
                </Button>
                <Divider hidden />
                <Button
                  basic={state.size !== "Medium"}
                  onClick={() => {
                    dispatch({ type: "change_size", payload: "Medium" });
                  }}
                  color="olive"
                >
                  🧑🏻‍🤝‍🧑🏻 Some (8-16)
                </Button>
                <Divider hidden />
                <Button
                  basic={state.size !== "Small"}
                  onClick={() => {
                    dispatch({ type: "change_size", payload: "Small" });
                  }}
                  color="yellow"
                >
                  🧍 Little (2-8)
                </Button>
              </Button.Group>
            </div>
            <Divider />
            <Segment clearing basic>
              {questionIndex > 0 ? (
                <Button floated="left" onClick={prevQuestion} negative>
                  back
                </Button>
              ) : null}
              <Button
                floated="right"
                onClick={nextQuestion}
                disabled={!state.size}
                color="orange"
              >
                Next
              </Button>
            </Segment>
          </Segment>
        </>
      ),
    },
    {
      header: "How long do you have? ⌚",
      content: (
        <>
          <Segment basic>
            <Header inverted size="medium">
              <Header.Content>
                How long do you want the tournament to last?
              </Header.Content>
            </Header>
            <Divider />
            <div>
              <Button.Group
                widths="3"
                vertical
                size={windowWidth > 768 ? "massive" : "large"}
              >
                <Button
                  basic={state.time !== "Slow"}
                  onClick={() => {
                    dispatch({ type: "change_time", payload: "Slow" });
                  }}
                  color="green"
                >
                  🐌 No Rush
                </Button>
                <Divider hidden />
                <Button
                  basic={state.time !== "Normal"}
                  onClick={() => {
                    dispatch({ type: "change_time", payload: "Normal" });
                  }}
                  color="olive"
                >
                  ⌛ Normal
                </Button>
                <Divider hidden />
                <Button
                  basic={state.time !== "Fast"}
                  onClick={() => {
                    dispatch({ type: "change_time", payload: "Fast" });
                  }}
                  color="yellow"
                >
                  🚀 Fast
                </Button>
              </Button.Group>
            </div>
            <Divider />
            <Segment clearing basic>
              {questionIndex > 0 ? (
                <Button floated="left" onClick={prevQuestion} negative>
                  back
                </Button>
              ) : null}
              <Button
                floated="right"
                onClick={nextQuestion}
                disabled={!state.time}
                color="orange"
              >
                Next
              </Button>
            </Segment>
          </Segment>
        </>
      ),
    },
    {
      header: "How do players compete? 🏅",
      content: (
        <>
          <Segment basic>
            <Header inverted size="medium">
              <Header.Content>
                How are the players going to participate in your tournament?
              </Header.Content>
            </Header>
            <Divider />
            <div>
              <Button.Group
                widths="3"
                vertical
                size={windowWidth > 768 ? "massive" : "large"}
              >
                <Button
                  basic={state.compete !== "PVP"}
                  onClick={() => {
                    dispatch({ type: "change_compete", payload: "PVP" });
                  }}
                  color="green"
                >
                  🤼 Player vs Player
                </Button>
                <Divider hidden />
                <Button
                  basic={state.compete !== "PVE"}
                  onClick={() => {
                    dispatch({ type: "change_compete", payload: "PVE" });
                  }}
                  color="olive"
                >
                  🧑‍🤝‍🧑 Player vs Everyone (Matches)
                </Button>
                <Divider hidden />
                <Button
                  basic={state.compete !== "PVEL"}
                  onClick={() => {
                    dispatch({ type: "change_compete", payload: "PVEL" });
                  }}
                  color="yellow"
                >
                  🧑‍🤝‍🧑 Player vs Everyone (Leaderboard)
                </Button>
              </Button.Group>
            </div>
            <Divider />

            <Segment clearing basic>
              {questionIndex > 0 ? (
                <Button floated="left" onClick={prevQuestion} negative>
                  back
                </Button>
              ) : null}
              <Button
                floated="right"
                onClick={nextQuestion}
                disabled={!state.compete}
                color="orange"
              >
                Next
              </Button>
            </Segment>
          </Segment>
        </>
      ),
    },
    {
      header: "What we think? 🧠",
      content: (
        <>
          <Segment basic>
            <Header inverted as="h2">
              {decidedTournamentType.title}
              <Header.Subheader>{decidedTournamentType.desc}</Header.Subheader>
            </Header>
            <Divider />
            <Grid centered doubling stretched stackable>
              <Grid.Row stretched>
                <Grid.Column width={8}>
                  <Header
                    inverted
                    textAlign="center"
                    style={{ paddingTop: 10 }}
                  >
                    <Header.Content>Advantages</Header.Content>
                  </Header>
                  <Segment inverted color="green" style={{ height: "100%" }}>
                    {decidedTournamentType.advantages.map((ad) => {
                      return <div style={tournamentTypeStyle}>✅ {ad}</div>;
                    })}
                  </Segment>
                </Grid.Column>
                <Grid.Column width={8}>
                  <Header
                    inverted
                    textAlign="center"
                    style={{ paddingTop: 10 }}
                  >
                    <Header.Content>Disadvantages</Header.Content>
                  </Header>
                  <Segment inverted color="orange" style={{ height: "100%" }}>
                    {decidedTournamentType.disadvantages.map((disad) => {
                      return <div style={tournamentTypeStyle}>❌ {disad}</div>;
                    })}
                  </Segment>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Divider />
            <Segment padded clearing basic>
              <Button floated="left" onClick={resetForm} negative>
                Try again
              </Button>
              <Button floated="right" positive onClick={nextQuestion}>
                Sound Good!
              </Button>
            </Segment>
          </Segment>
        </>
      ),
    },
    {
      header: "Just Some Additional Things 📜",
      content: (
        <>
          <Segment basic>
            {decidedTournamentType.additionalInfo.length === 0 ? (
              <>
                <Header inverted size="medium">
                  <Header.Content>
                    We've got everything we needed.
                  </Header.Content>
                </Header>
              </>
            ) : (
              <>
                <Header inverted size="medium">
                  <Header.Content>
                    Lets get the last of the details
                  </Header.Content>
                </Header>
              </>
            )}
            <Divider />
            <Segment basic padded>
              {decidedTournamentType.additionalInfo.map((additionalInput) => {
                return (
                  <>
                    <Input
                      onChange={(event, data) => {
                        dispatch({
                          type: `change_${additionalInput.value}`,
                          payload: data.value,
                        });
                      }}
                      className="settingInput"
                      fluid
                      size="massive"
                      type={additionalInput.type}
                      placeholder={additionalInput.inputPlaceholder}
                    />
                    <div
                      style={{
                        fontSize: 16,
                        paddingTop: 10,
                        fontWeight: "bold",
                        color: "white",
                      }}
                    >
                      {additionalInput.subTitle}
                    </div>
                    <Divider />
                  </>
                );
              })}
            </Segment>

            {decidedTournamentType.additionalInfo.length === 0 ? null : (
              <Divider />
            )}

            <Segment clearing basic>
              <Button floated="left" onClick={resetForm} negative>
                Try again
              </Button>
              <Button floated="right" positive onClick={submitTournament}>
                ✔️{" "}
                {decidedTournamentType.additionalInfo.length === 0
                  ? "Create Tournament"
                  : "All Good"}
              </Button>
            </Segment>
          </Segment>
        </>
      ),
    },
  ];

  return (
    <>
      <div
        className="fade-image"
        style={{
          ...imageCoverStyle,
          display: "flex",
          zIndex: -1,
          position: "absolute",
          backgroundImage: `url(${topImage})`,
          ...(windowWidth > 768
            ? {
                height: windowHeight - sideImageSize,
                width: windowWidth / 2.8,
                left: 0,
                top: sideImageSize + 2,
                bottom: 0,
              }
            : {
                height: windowWidth - sideImageSize,
                width: windowWidth,
                left: 0,
                top: sideImageSize,
                bottom: 0,
              }),
        }}
      />

      <div
        style={{
          display: "flex",
          height: windowHeight - sideImageSize,
          width: windowWidth,
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <Segment basic style={{ width: windowWidth > 650 ? "85%" : "" }}>
          <Header inverted style={{ fontSize: 16 + windowWidth / 60 }}>
            <Header.Content className="text-shadow">
              {questions[questionIndex].header}
              <Header.Subheader></Header.Subheader>
            </Header.Content>
          </Header>
          <Divider section />
          <div style={{ width: "100%" }}>
            <Segment style={{ backgroundColor: "#2c2f39" }}>
              <Progress
                total={questions.length}
                color="green"
                value={questionIndex + 1}
                attached="top"
              />
              {questions[questionIndex].content}
            </Segment>
          </div>
        </Segment>
      </div>
    </>
  );
}
