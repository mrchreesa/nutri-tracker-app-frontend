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
// import { useAuthedProfile } from "../Context/AuthedProfileContext";

import Header from "../Components/Header";
import Joke from "../Components/Joke";

const defaultLoginFieldValues = {
  email: "",
  password: "",
};

export default function Login(props) {
  const [loginFieldValues, setLoginFieldValues] = useState(
    defaultLoginFieldValues
  );

  // useEffect(() => {
  //   registerUser();
  // }, []);

  const loginFormOnChangeHandler = new OnChangeHandler(
    loginFieldValues,
    setLoginFieldValues
  );
  // const { authedProfile, setAuthedProfile } = useAuthedProfile;

  const loginWithCredentials = () => {
    axios
      .post("/users/session", loginFieldValues)
      .then(function (response) {
        console.log(loginFieldValues);

        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
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
              label="Email"
              name="email"
              value={loginFieldValues.email}
              onChange={loginFormOnChangeHandler.handleEvent}
            />
            <TextField
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
