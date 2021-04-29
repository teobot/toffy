import React, { useContext } from "react";

import {
  Divider,
  Header,
  Segment,
  Icon,
  Button,
  Grid,
} from "semantic-ui-react";

import toffy from "../../../api/toffy";

import calculateCreated from "../../../functions/calculateCreated";

import { ToastContext } from "../../../context/ToastContext";

export default function TournamentMessages({ messages, getTournamentData }) {
  const { showToast } = useContext(ToastContext);

  const markMessageAsRead = async (id) => {
    //   Mark a message as read
    try {
      const r = await toffy.post(`/message/read/${id}`);
      showToast("info", "Message Read");
      await getTournamentData();
    } catch (error) {
      showToast("error", error.response.data.message);
    }
  };
  return (
    <>
      <Divider hidden />
      {messages.length > 0 ? (
        <>
          <Segment
            style={{ backgroundColor: "#2a2e3a", color: "white", fontSize: 14 }}
          >
            Unread Messages
          </Segment>
          <Grid verticalAlign stretched padded doubling stackable>
            {messages.map((message) => {
              return (
                <Grid.Row>
                  <Grid.Column computer={13} tablet={13} width={13} mobile={16}>
                    <Header as="h5" style={{ color: "#d2dadd" }}>
                      <Icon name="mail" />
                      <Header.Content>
                        {message.message}
                        <Header.Subheader style={{ color: "#7e818a" }}>
                          {calculateCreated(message.created)}
                        </Header.Subheader>
                      </Header.Content>
                    </Header>
                  </Grid.Column>
                  <Grid.Column
                    computer={3}
                    tablet={3}
                    width={3}
                    mobile={16}
                    textAlign="right"
                    verticalAlign
                  >
                    <Button
                      primary
                      compact
                      size="small"
                      onClick={() => {
                        markMessageAsRead(message._id);
                      }}
                    >
                      Mark Read
                    </Button>
                  </Grid.Column>
                </Grid.Row>
              );
            })}
          </Grid>
        </>
      ) : (
        <Segment inverted>
          <Header inverted as="h4">
            <Header.Content>No new messages</Header.Content>
          </Header>
        </Segment>
      )}
    </>
  );
}
