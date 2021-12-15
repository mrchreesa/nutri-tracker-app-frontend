import React from "react";
import { Grid, Typography, TextField, Button, Paper } from "@material-ui/core";

export default function ResultItem({ id, name, image }) {
  const src = `https://spoonacular.com/cdn/ingredients_100x100/${image}`;

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <Grid className="result-item-container">
      <Typography variant="h6" style={{ paddingLeft: "4%", letterSpacing: 3 }}>
        {capitalizeFirstLetter(name)}
      </Typography>
      <div style={{ flexGrow: 1 }}></div>
      <img className="image" src={src} alt={name} />
      <div style={{ flexGrow: 1 }}></div>
    </Grid>
  );
}
