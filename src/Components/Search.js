import React from "react";
import { Grid, TextField, Button } from "@material-ui/core";

export default function Search({ search, setSearch, setQuery }) {
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
    </Grid>
  );
}
