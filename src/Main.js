import React, { useState, useEffect } from "react";

import { Grid, MuiThemeProvider } from "@material-ui/core";

import { useStyles, THEME } from "./Styles/StylesAccordion";

import "./App.css";
import axios from "axios";
import Header from "./Components/Header";
import Search from "./Components/Search";
import ResultList from "./Results/ResultList";

require("dotenv").config();
// make this an ENV
// const API_KEY = "456bfcb65cc547649537683cf42c7271";
const API_KEY = "b5eed59fc04f4aa2a922e46b0541efc9";
//axios.defaults.baseURL = "https://api.spoonacular.com/food/";
const spoonacularAPI = axios.create({
  baseURL: "https://api.spoonacular.com/food/",
});

function Main() {
  const [result, setResult] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [offset, setOffset] = useState(10);
  const [totalResults, setTotalResults] = useState("");

  const classes = useStyles();

  // API CALL FOOD

  useEffect(() => {
    if (query) {
      getRecipes();
    }
  }, [query]);

  const getRecipes = () => {
    const response = spoonacularAPI
      .get(
        `/ingredients/search?query=${query}&number=10&apiKey=${API_KEY}&metaInformation=true.`
      )
      .then((response) => {
        const resultData = response.data.results;
        const totalResults = response.data.totalResults;
        if (resultData) {
          console.log(response);
          setResult(resultData);
        }
        if (totalResults) {
          setTotalResults(totalResults);
          console.log(totalResults);
        }
      });
  };
  // OFFSET Appender

  const appendNextTenFoods = () => {
    let updatedFoods = [...result];
    const response = spoonacularAPI
      .get(
        `/ingredients/search?query=${query}&number=10&offset=${offset}&apiKey=${API_KEY}&metaInformation=true.`
      )
      .then((response) => {
        let mergedFoods = updatedFoods.concat(response.data.results);

        setResult(mergedFoods);
        console.log(mergedFoods);
        if (response.data.totalResults > mergedFoods.length) {
          setOffset(offset + 10);
          console.log(offset);
        } else {
        }
      });
  };

  // API CALL NUTRITION

  const [searchNutrients, setSearchNutrients] = useState([]);
  const [foodId, setFoodId] = useState(null);
  useEffect(() => {
    if (foodId !== null) {
      getNutrients();
    }
    console.log(foodId);
  }, [foodId]);

  const getNutrients = () => {
    const response = spoonacularAPI
      .get(
        `/products/${foodId}/nutritionWidget?defaultCss=true&apiKey=${API_KEY}&metaInformation=true.`
      )
      .then((response) => {
        const resultData = response.data;
        if (resultData) {
          setSearchNutrients(resultData);
        }
      })
      .catch((error) => {
        console.log(error.response.data);
        if (error.response.data.code === 404) {
          setFoodId(1001033);
        }
      });
  };

  const handleIdChange = (event) => {
    setFoodId(event.target.value);
  };

  return (
    <MuiThemeProvider theme={THEME}>
      <Grid container className={classes.root}>
        <Header />
        <Search search={search} setSearch={setSearch} setQuery={setQuery} />

        <ResultList
          foodId={foodId}
          setFoodId={setFoodId}
          result={result}
          setResult={setResult}
          appendNextTenFoods={appendNextTenFoods}
          searchNutrients={searchNutrients}
          totalResults={totalResults}
        />
        <div className="spacer layer1"></div>
      </Grid>
    </MuiThemeProvider>
  );
}

export default Main;
