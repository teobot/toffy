import React, { useState, useContext, useEffect } from "react";

import {
  Container,
  Header,
  Button,
  Divider,
  Grid,
  Segment,
} from "semantic-ui-react";

import { useHistory } from "react-router-dom";

import { WindowContext } from "../context/WindowContext";

import topImage from "../img/widescreen-017.jpg";
export default function CreateTournamentSelect() {
  const [sideImageSize, setSideImageSize] = useState(150);

  let history = useHistory();

  const { windowWidth, windowHeight } = useContext(WindowContext);

  useEffect(() => {
    setSideImageSize(document.getElementById("navbar").clientHeight + 50);
  }, []);

  const imageCoverStyle = {
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: `${windowWidth > 650 ? "center" : "top"} center`,
  };
  return (
    <>
      <Grid>
        <Grid.Row>
          <Grid.Column
            computer={6}
            largeScreen={6}
            mobile={16}
            widescreen={6}
            tablet={6}
            width={6}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "lavender",
                display: "flex",
                minHeight:
                  windowWidth > 758
                    ? windowHeight - sideImageSize
                    : windowHeight / 4,
                ...imageCoverStyle,
                backgroundImage: `url(${topImage})`,
              }}
              className="fade-image"
            />
          </Grid.Column>
          <Grid.Column
            computer={10}
            largeScreen={10}
            mobile={16}
            widescreen={10}
            tablet={10}
            width={10}
          >
            <div
              style={{
                display: "flex",
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Container text style={{ padding: `0px ${windowWidth / 15}px` }}>
                <Header inverted style={{ fontSize: 16 + windowWidth / 60 }}>
                  <Header.Content>
                    Create Tournament
                    <Header.Subheader>
                      If you know what tournament you want to create select
                      "ADVANCED" otherwise if you would like to use the smart
                      creator select "SIMPLE"
                    </Header.Subheader>
                  </Header.Content>
                </Header>
                <Divider section />

                <Segment basic>
                  <Grid columns={2} relaxed stackable>
                    <Grid.Column>
                      <Button
                        icon="idea"
                        labelPosition="left"
                        fluid
                        size="large"
                        color="orange"
                        content="SIMPLE"
                        onClick={() => {
                          history.push("/create/simple/tournament");
                        }}
                      />
                    </Grid.Column>

                    {windowWidth < 758 ? (
                      <Grid.Column>
                        <Divider inverted horizontal>
                          Or
                        </Divider>
                      </Grid.Column>
                    ) : null}

                    <Grid.Column verticalAlign="middle">
                      <Button
                        icon="idea"
                        labelPosition="left"
                        size="large"
                        fluid
                        color="orange"
                        content="ADVANCED"
                        onClick={() => {
                          history.push("/create/advanced/tournament");
                        }}
                      />
                    </Grid.Column>
                  </Grid>

                  {windowWidth > 758 ? (
                    <Divider inverted vertical>
                      Or
                    </Divider>
                  ) : null}
                </Segment>

                {/* <Segment.Group
                  horizontal={windowWidth > 650}
                  style={{ backgroundColor: "transparent" }}
                >
                  <Segment basic>
                    <Button
                      icon="idea"
                      labelPosition="left"
                      size="huge"
                      fluid
                      color="orange"
                      content="SIMPLE"
                    />
                  </Segment>
                  <Segment basic>
                    <Divider inverted vertical={windowWidth > 650} horizontal={windowWidth < 650}>
                      OR
                    </Divider>
                  </Segment>
                  <Segment basic>
                    <Button
                      icon="idea"
                      labelPosition="left"
                      size="huge"
                      fluid
                      color="orange"
                      content="ADVANCED"
                    />
                  </Segment>
                </Segment.Group> */}

                {/* <Segment basic>
                  <Grid columns={2} relaxed="very" stackable>
                    <Grid.Column>
                      <Button
                        icon="idea"
                        labelPosition="left"
                        size="huge"
                        fluid
                        color="orange"
                        content="SIMPLE"
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Button
                        color="orange"
                        fluid
                        icon
                        size="huge"
                        labelPosition="left"
                        style={{ textAlign: "center" }}
                      >
                        <Icon name="computer" />
                        ADVANCED
                      </Button>
                    </Grid.Column>
                  </Grid>

                  {windowWidth > 650 ? (
                    <Divider inverted vertical>
                      OR
                    </Divider>
                  ) : null}
                </Segment> */}
              </Container>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
}
