import React from "react";
import { Grid, TextField, Button, Typography, Box } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

import { useAuthedProfile } from "../Context/AuthedProfileContext";
import axios from "axios";

export default function Search(props) {
  const { search, setSearch, setQuery, history, isLoading } = props;
  const { authedProfile, setAuthedProfile } = useAuthedProfile();
  const handleChange = (event) => {
    setSearch(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    setQuery(search);
    setSearch("");
  };

  return (
    <Grid container item className="search-container">
      {isLoading ? (
        <Box pt={2.5}>
          <Skeleton width="60%" />
        </Box>
      ) : (
        <>
          <Grid>
            <Typography
              className="search-add"
              variant="h5"
              style={{ letterSpacing: 2 }}
            >
              Search & Add Foods To Your Nutri Tracker{" "}
              <img className="logo logo-profile-search" src="../../logo3.png" />
            </Typography>
          </Grid>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Search Your Food"
              varient="outlined"
              className="search-bar"
              onChange={handleChange}
              value={search}
            ></TextField>
            <Button
              className="btn-search"
              type="submit"
              onClick={handleSubmit}
              style={{ letterSpacing: 3, fontSize: 28 }}
            >
              Search
            </Button>
          </form>
        </>
      )}
    </Grid>
  );
}
