import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Grid, MuiThemeProvider } from "@material-ui/core";

import { useStyles, THEME } from "./Styles/StylesAccordion";
import { useAuthedProfile } from "./Context/AuthedProfileContext";

import "./App.css";
import axios from "axios";
import Header from "./Components/Header";
import Search from "./Components/Search";
import ResultList from "./Results/ResultList";

require("dotenv").config();
// make this an ENV
const API_KEY = "456bfcb65cc547649537683cf42c7271";
// const API_KEY = "b5eed59fc04f4aa2a922e46b0541efc9";
//axios.defaults.baseURL = "https://api.spoonacular.com/food/";
const spoonacularAPI = axios.create({
  baseURL: "https://api.spoonacular.com/food/",
});

function Main(props) {
  const [result, setResult] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [offset, setOffset] = useState(10);
  const [totalResults, setTotalResults] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { authedProfile, setAuthedProfile } = useAuthedProfile();

  const classes = useStyles();
  const { history } = props;

  // API CALL FOOD

  useEffect(() => {
    if (query) {
      getRecipes();
    }
  }, [query]);

  const getRecipes = () => {
    setIsLoading(true);
    const response = spoonacularAPI
      .get(
        `/ingredients/search?query=${query}&number=10&apiKey=${API_KEY}&metaInformation=true.`
      )
      .then((response) => {
        setIsLoading(false);
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

  const [searchNutrients, setSearchNutrients] = useState(null);
  const [weightPerServing, setWeightPerServing] = useState(null);
  const [foodId, setFoodId] = useState(null);
  useEffect(() => {
    if (foodId != null) {
      getNutrients(foodId);
    }
  }, [foodId]);

  const getNutrients = () => {
    const response = spoonacularAPI
      .get(
        `/ingredients/${foodId}/information?amount=1&apiKey=${API_KEY}&metaInformation=true.`
      )

      .then((response) => {
        const resultNutritionData = response.data.nutrition.nutrients;
        const weightPerServing = response.data.nutrition.weightPerServing;
        console.log(response.data);
        let newNutrients = {};
        resultNutritionData.forEach((item, index) => {
          newNutrients[item.name] = item;
        });
        console.log(newNutrients);

        if (resultNutritionData) {
          setSearchNutrients(newNutrients);
        }
        if (weightPerServing) {
          setWeightPerServing(weightPerServing);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleIdChange = (event) => {
    setFoodId(event.target.value);
  };

  //Get Session

  useEffect(() => {
    axios
      .get("/users/session")
      .then((response) => {
        console.log(response);
        setAuthedProfile(response.data);
      })
      .catch((err) => {
        //const responseCode = err.response.status;
        console.log(err.response);
      });
  }, []);

  // Delete Sessions
  const logOut = () => {
    setIsLoading(true);

    axios
      .delete("/users/session")
      .then((response) => {
        setAuthedProfile(null);
        setIsLoading(false);

        history.push("/");
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log(authedProfile);
  return (
    <MuiThemeProvider theme={THEME}>
      <Grid container className={classes.root}>
        <Header logOut={logOut} history={history} />
        <Search
          search={search}
          setSearch={setSearch}
          setQuery={setQuery}
          history={history}
          isLoading={isLoading}
        />

        <ResultList
          getNutrients={getNutrients}
          foodId={foodId}
          setFoodId={setFoodId}
          result={result}
          setResult={setResult}
          appendNextTenFoods={appendNextTenFoods}
          searchNutrients={searchNutrients}
          weightPerServing={weightPerServing}
          totalResults={totalResults}
          isLoading={isLoading}
        />
        <div className="spacer layer1"></div>
      </Grid>
    </MuiThemeProvider>
  );
}

export default Main;
