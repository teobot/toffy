import React, { useReducer, useContext } from "react";
import { useHistory } from "react-router";
import { Button, Form } from "semantic-ui-react";

import toffy from "../api/toffy";

import { LoggedInContext } from "../context/LoggedInContext";

const reducer = (state, action) => {
  switch (action.type) {
    case "change_username":
      return { ...state, username: action.payload };
    case "change_firstname":
      return { ...state, firstname: action.payload };
    case "change_lastname":
      return { ...state, lastname: action.payload };
    case "change_email":
      return { ...state, email: action.payload };
    case "change_password":
      return { ...state, password: action.payload };
    default:
      return state;
  }
};

export default function AccountCreateScreen() {
  const [state, dispatch] = useReducer(reducer, {
    username: "sap",
    firstname: "Theo",
    lastname: "Clapperton",
    email: "placeholder@outlook.com",
    password: "password",
  });

  const { handleUserLogin } = useContext(LoggedInContext);

  let history = useHistory();

  const handleSubmit = async () => {
    const r = await toffy.post("/signup", state);

    if (r.status === 200) {
      // account creation successful

      // Tell Context user has logged in
      handleUserLogin(r.data.token);

      // Push the user to the home screen
      history.push("/home");
    } else {
      // TODO: account creation has failed
      console.log(r);
    }
  };

  const handleInputChange = (event, type) => {
    dispatch({ type, payload: event.target.value });
  };

  return (
    <div>
      <h1>Account Creation</h1>
      <Form>
        <Form.Field>
          <label>username</label>
          <input
            value={state.username}
            placeholder="username"
            onChange={(event) => {
              handleInputChange(event, "change_username");
            }}
          />
        </Form.Field>

        <Form.Field>
          <label>First Name</label>
          <input
            onChange={(event) => {
              handleInputChange(event, "change_firstname");
            }}
            value={state.firstname}
            placeholder="First Name"
          />
        </Form.Field>

        <Form.Field>
          <label>lastname</label>
          <input
            placeholder="lastname"
            onChange={(event) => {
              handleInputChange(event, "change_lastname");
            }}
            value={state.lastname}
          />
        </Form.Field>

        <Form.Field>
          <label>email</label>
          <input
            placeholder="email"
            onChange={(event) => {
              handleInputChange(event, "change_email");
            }}
            value={state.email}
          />
        </Form.Field>

        <Form.Field>
          <label>password</label>
          <input
            placeholder="password"
            onChange={(event) => {
              handleInputChange(event, "change_password");
            }}
            value={state.password}
          />
        </Form.Field>

        <Button onClick={handleSubmit} type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
