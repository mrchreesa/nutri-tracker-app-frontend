import React from "react";
import { Link } from "react-router-dom";

import { Grid, Button } from "@material-ui/core";

export default function Header() {
  return (
    <Grid className="nav-bar">
      <img className="logo" src="../../logo3.png" alt="logo1" />
      <div className="empty"></div>
      <Link to="/">
        <Button className="btn-logo2">
          <img className="logo2" src="../../newlogo123.png" alt="logo2" />
        </Button>
      </Link>
      <div className="empty"></div>
      <Link to="/login" style={{ textDecoration: "none" }}>
        {" "}
        <Button className="login-btn">Log in</Button>
      </Link>
    </Grid>
  );
}
