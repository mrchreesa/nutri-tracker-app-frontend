import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthedProfile } from "../Context/AuthedProfileContext";
import { useFoodCount } from "../Context/AuthedProfileContext";

import { Grid, Button, Typography, Badge } from "@material-ui/core";
import axios from "axios";

export default function Header(props) {
  const { history, logOut } = props;
  const { foodCount, setFoodCount } = useFoodCount();

  const { authedProfile, setAuthedProfile } = useAuthedProfile();
  console.log(authedProfile);
  useEffect(() => {
    let username;
    {
      authedProfile ? (username = authedProfile.username) : (username = 0);
    }
    axios
      .get(`users/${username}`)
      .then((response) => {
        console.log(response.data[0].ingredients.length);
        setFoodCount(response.data[0].ingredients.length);
      })
      .catch((err) => {
        //const responseCode = err.response.status;
        console.log(err);
      });
  }, []);

  return (
    <Grid className="nav-bar">
      {authedProfile !== null ? (
        <Badge badgeContent={foodCount} color="primary">
          <Link to="/profile" className="logo-link">
            <img className="logo" src="../../logo3.png" alt="logo1" />
          </Link>
        </Badge>
      ) : (
        <Link to="/login" className="logo-link">
          <img className="logo" src="../../logo3.png" alt="logo1" />
        </Link>
      )}
      {authedProfile ? (
        <Typography
          className="search-add profile-hi"
          style={{ letterSpacing: 2, width: "max-content" }}
        >
          Hi, {authedProfile.username ? authedProfile.username : authedProfile}!
        </Typography>
      ) : null}

      <div className="empty"></div>
      <Link to="/">
        <Button className="btn-logo2">
          <img className="logo2" src="../../newlogo123.png" alt="logo2" />
        </Button>
      </Link>
      <div className="empty"></div>
      {!authedProfile ? (
        <Link to="/login" style={{ textDecoration: "none" }}>
          {" "}
          <Button className="login-btn">Log in</Button>
        </Link>
      ) : (
        <Button className="login-btn" onClick={logOut}>
          Log out
        </Button>
      )}
    </Grid>
  );
}
