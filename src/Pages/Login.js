import React, { useState, useEffect } from "react";
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

import Header from "../Components/Header";
import Joke from "../Components/Joke";

const defaultLoginFieldValues = {
  email: "",
  password: "",
};

export default function Login(props) {
  const { history } = props;
  const [loginFieldValues, setLoginFieldValues] = useState(
    defaultLoginFieldValues
  );
  const [isErrorUsername, setIsErrorUsername] = useState(null);
  const [isErrorEmail, setIsErrorEmail] = useState(null);
  const [isErrorPassword, setIsErrorPassword] = useState(null);

  const [helperTextUsername, setHelperTextUsername] = useState("");
  const [helperTextEmail, setHelperTextEmail] = useState("");
  const [helperTextPassword, setHelperTextPassword] = useState("");

  // useEffect(() => {
  //   registerUser();
  // }, []);

  const loginFormOnChangeHandler = new OnChangeHandler(
    loginFieldValues,
    setLoginFieldValues
  );
  const { authedProfile, setAuthedProfile } = useAuthedProfile();

  const loginWithCredentials = () => {
    const { email, password } = loginFieldValues;
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
    {
      axios
        .post("/users/session", loginFieldValues)
        .then(function (response) {
          const { username } = response.data;

          console.log(response);
          setLoginFieldValues(defaultLoginFieldValues);
          setAuthedProfile(username);
          history.push("/search");
        })
        .catch(function (error) {
          console.log(error.message);
        });
    }
  };

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
              Log In
            </Typography>
            <TextField
              error={isErrorEmail}
              helperText={helperTextEmail}
              label="Email"
              name="email"
              value={loginFieldValues.email}
              onChange={loginFormOnChangeHandler.handleEvent}
            />
            <TextField
              error={isErrorPassword}
              helperText={helperTextPassword}
              label="Password"
              name="password"
              value={loginFieldValues.password}
              onChange={loginFormOnChangeHandler.handleEvent}
            />

            <Button className="btn-log-reg" onClick={loginWithCredentials}>
              Enter
            </Button>
          </Grid>
          <Joke />
        </Grid>

        <div className="spacer layer1"></div>
      </Grid>
    </MuiThemeProvider>
  );
}
