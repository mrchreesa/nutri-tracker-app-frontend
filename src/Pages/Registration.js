import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Grid,
  Card,
  MuiThemeProvider,
  Typography,
  Button,
  TextField,
} from "@material-ui/core";
import { useStyles, THEME } from "../Styles/StylesAccordion";

import { OnChangeHandler } from "../Libs";
import { useAuthedProfile } from "../Context/AuthedProfileContext";
// import UserContext from "../Context/AuthedProfileContext";

import Header from "../Components/Header";
import Joke from "../Components/Joke";

const defaultRegistrationFieldValues = {
  username: "",
  email: "",
  password: "",
};

export default function Registration(props) {
  const { history } = props;

  const [registrationFieldValues, setRegistrationFieldValues] = useState(
    defaultRegistrationFieldValues
  );
  const [isErrorUsername, setIsErrorUsername] = useState(null);
  const [isErrorEmail, setIsErrorEmail] = useState(null);
  const [isErrorPassword, setIsErrorPassword] = useState(null);

  const [helperTextUsername, setHelperTextUsername] = useState("");
  const [helperTextEmail, setHelperTextEmail] = useState("");
  const [helperTextPassword, setHelperTextPassword] = useState("");

  const registrationFormOnChangeHandler = new OnChangeHandler(
    registrationFieldValues,
    setRegistrationFieldValues
  );
  const { authedProfile, setAuthedProfile } = useAuthedProfile();

  const register = (registrationFormInput) => {
    const { username, email, password } = registrationFormInput;

    switch (true) {
      case username == null || username.length == 0:
        setIsErrorUsername(true);
        setHelperTextUsername("Must provide a username");
        break;
      case username.length > 0 && username.length <= 3:
        setIsErrorUsername(true);
        setHelperTextUsername("Username is too short");
        break;
      case username.length > 30:
        setIsErrorUsername(true);
        setHelperTextUsername("Username cannot be longer than 30 characters");
        break;
      default:
        setIsErrorUsername(false);
        setHelperTextUsername("");
        break;
    }
    switch (true) {
      case !email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )?.input:
        setIsErrorEmail(true);
        setHelperTextEmail("Must provide a valid email address");
        break;
      case email.length > 50:
        setIsErrorEmail(true);
        setHelperTextEmail("Email cannot be longer than 50 characters");
        break;
      default:
        setIsErrorEmail(false);
        setHelperTextEmail("");
        break;
    }
    switch (true) {
      case password == null || password.length == 0:
        setIsErrorPassword(true);
        setHelperTextPassword("Must provide a password");
        break;
      case password.length > 0 && password.length <= 5:
        setIsErrorPassword(true);
        setHelperTextPassword("Password must be at least 6 characters long");
        break;
      case password.length > 50:
        setIsErrorPassword(true);
        setHelperTextPassword("Password cannot be longer than 50 characters");
        break;
      default:
        setIsErrorPassword(false);
        setHelperTextPassword("");
        break;
    }
  };

  console.log(isErrorUsername, isErrorEmail, isErrorPassword);
  const registerUser = (user) => {
    return axios
      .post("/users", registrationFieldValues)

      .then((response) => {
        const { username } = response.data;
        setAuthedProfile(username);
        setRegistrationFieldValues(defaultRegistrationFieldValues);
        history.push("/search");
      })

      .catch(function (error) {
        console.log(error);
      });
  };
  console.log(authedProfile);

  const classes = useStyles();

  return (
    <MuiThemeProvider theme={THEME}>
      <Grid container item className={classes.root}>
        <Header />

        <Grid container className="profile-reg-container">
          <Grid
            className="reg"
            component={Card}
            container
            direction="column"
            justify="space-around"
            style={{ padding: 20 }}
          >
            <Typography variant="h5" style={{ textAlign: "center" }}>
              Registration
            </Typography>
            <TextField
              error={isErrorUsername}
              helperText={helperTextUsername}
              label="Username"
              name="username"
              value={registrationFieldValues.username}
              onChange={registrationFormOnChangeHandler.handleEvent}
            />
            <TextField
              error={isErrorEmail}
              helperText={helperTextEmail}
              label="Email"
              name="email"
              value={registrationFieldValues.email}
              onChange={registrationFormOnChangeHandler.handleEvent}
            />
            <TextField
              error={isErrorPassword}
              helperText={helperTextPassword}
              label="Password"
              name="password"
              value={registrationFieldValues.password}
              onChange={registrationFormOnChangeHandler.handleEvent}
            />
            <Button
              className="btn-log-reg"
              onClick={() => {
                register(registrationFieldValues);
                registerUser();
              }}
            >
              Submit
            </Button>
          </Grid>
          <Joke />
        </Grid>

        <div className="spacer layer1"></div>
      </Grid>
    </MuiThemeProvider>
  );
}
