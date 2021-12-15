import React, { useState, useEffect } from "react";
import { Grid, Typography, TextField, Button, Paper } from "@material-ui/core";
import "../App.css";
import axios from "axios";
import ResultNutrients from "../Results/ResultNutrients";

const API_KEY = "456bfcb65cc547649537683cf42c7271"; // make this an ENV

axios.defaults.baseURL = "https://api.spoonacular.com/";

export default function Nutrients({ searchNutrients }) {
  // const [searchNutrients, setSearchNutrients] = useState([]);
  // const [foodId, setFoodId] = useState(9266);
  // useEffect(() => {
  //   getNutrients();
  // }, [foodId]);

  // const getNutrients = () => {
  //   const response = axios
  //     .get(
  //       `https://api.spoonacular.com/food/products/${foodId}/nutritionLabel?amount=1&apiKey=${API_KEY}&metaInformation=true.`
  //     )
  //     .then((response) => {
  //       const resultData = response.data;
  //       if (resultData) {
  //         setSearchNutrients(resultData);
  //         console.log(searchNutrients);
  //       }
  //     });
  // };

  return (
    <Grid>
      <Grid container className="result-nutrients-container">
        <div dangerouslySetInnerHTML={{ __html: searchNutrients }} />
      </Grid>
    </Grid>
  );
}
{
}
