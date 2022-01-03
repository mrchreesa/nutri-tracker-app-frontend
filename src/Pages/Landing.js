import React from "react";
import { Link } from "react-router-dom";

import { Grid, MuiThemeProvider, Typography, Button } from "@material-ui/core";
import { useStyles, THEME } from "../Styles/StylesAccordion";
import { useAuthedProfile } from "../Context/AuthedProfileContext";

import Header from "../Components/Header";

export default function Landing() {
  const classes = useStyles();
  const { authedProfile, setAuthedProfile } = useAuthedProfile();
  console.log(authedProfile);
  return (
    <MuiThemeProvider theme={THEME}>
      <Grid container item className={classes.root}>
        <Header />
        <Grid container className="landing-container">
          <Grid container className="landing-text-container">
            <Typography className="landing-text" style={{ fontSize: "3.8vw" }}>
              NUTRIENT & CALORIE <br /> TRACKING MADE EASY
            </Typography>
            <Typography
              className="landing-text"
              style={{ fontSize: "2.3vw", marginTop: -10 }}
            >
              Search over 30,000 foods with <br />
              photos & keep track of your intake
            </Typography>
            {authedProfile == null ? (
              <Link to="/registration" style={{ textDecoration: "none" }}>
                <Button className="landing-btn">Get Started Now</Button>
              </Link>
            ) : (
              <Link to="/search" style={{ textDecoration: "none" }}>
                <Button className="landing-btn">Search Foods</Button>
              </Link>
            )}
          </Grid>

          <Grid>
            <img
              className="image-landing"
              src="../../p1bm5844cb6oacnd1std183s12gt6.png"
              alt="ss"
            />
          </Grid>
        </Grid>

        <div className="spacer layer1"></div>
      </Grid>
    </MuiThemeProvider>
  );
}
