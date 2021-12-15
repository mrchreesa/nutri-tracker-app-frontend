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

  // useEffect(() => {
  //   registerUser();
  // }, []);

  const registrationFormOnChangeHandler = new OnChangeHandler(
    registrationFieldValues,
    setRegistrationFieldValues
  );
  const { authedProfile, setAuthedProfile } = useAuthedProfile;
  // const { user, setUser } = useContext(UserContext);

  const register = (registrationFormInput) => {
    const { email, password, username } = registrationFormInput;
  };

  const registerUser = (user) => {
    axios
      .post("/users", registrationFieldValues)

      .then((response) => {
        const { username } = response.data;
        // setUser(username);
        setAuthedProfile(username);
        console.log(username);
        setRegistrationFieldValues(defaultRegistrationFieldValues);
        if (user) {
          history.push("/search");
        } else {
          console.log("user not authed");
        }
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
              Registration
            </Typography>
            <TextField
              label="Username"
              name="username"
              value={registrationFieldValues.username}
              onChange={registrationFormOnChangeHandler.handleEvent}
            />
            <TextField
              label="Email"
              name="email"
              value={registrationFieldValues.email}
              onChange={registrationFormOnChangeHandler.handleEvent}
            />
            <TextField
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
