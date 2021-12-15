import React from "react";
import { Grid, Typography, TextField, Button, Paper } from "@material-ui/core";

export default function ResultNutrients({ nutrition, name, image }) {
  const src = `https://spoonacular.com/cdn/ingredients_100x100/${image}`;
  return (
    <Grid
      className="result-nutriotion-item-container"
      container
      item
      component={Paper}
    >
      <Typography variant="h6" style={{ paddingRight: 10 }}>
        {name}
      </Typography>
      <Typography style={{ paddingRight: 10 }}>{nutrition}</Typography>
      <img className="image" src={src} alt={name} />
    </Grid>
  );
}
