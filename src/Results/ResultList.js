import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  MuiThemeProvider,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import "../App.css";
import axios from "axios";
import { useFoodCount } from "../Context/AuthedProfileContext";
import { useAuthedProfile } from "../Context/AuthedProfileContext";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useStyles, THEME } from "../Styles/StylesAccordion";

import ResultItem from "./ResultItem";
import ChartItem from "../Components/ChartItem";

export default function ResultList({
  result,
  setResult,
  setFoodId,
  foodId,
  appendNextTenFoods,
  searchNutrients,
  totalResults,
  getNutrients,
  weightPerServing,
  isLoading,
}) {
  const [expanded, setExpanded] = useState("panel1");
  const { foodCount, setFoodCount } = useFoodCount();
  const { authedProfile, setAuthedProfile } = useAuthedProfile();
  console.log(authedProfile);
  const classes = useStyles();

  const getFoodsCount = () => {
    const username = authedProfile.username;
    axios.get(`users/${username}`).then((response) => {
      console.log(response);
      setFoodCount(response.data[0].ingredients.length + 1);
    });
  };

  const changeColorEnter = (event) => {
    event.target.style.color = "hsl(14, 88%, 65%)";
  };
  const changeColorLeave = (event) => {
    event.target.style.color = "hsl(237, 12%, 33%)";
  };
  const handleChangeExpand = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const addFoodToProfile = (id) => {
    axios
      .post(`users/${authedProfile.username}/ingredients/${id}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log(totalResults);
  return (
    <MuiThemeProvider theme={THEME}>
      {isLoading ? (
        <>
          <Skeleton className="skeleton" animation="wave" />
          <Skeleton className="skeleton" animation="wave" />
          <Skeleton className="skeleton" animation="wave" />
          <Skeleton className="skeleton" animation="wave" />
        </>
      ) : result.length ? (
        result.map((item, index, arr) => (
          <Grid item container className="result-list-container">
            <Grid className={classes.accordionContainer} item>
              <Accordion
                expanded={expanded === index}
                onChange={handleChangeExpand(index)}
                style={{ boxShadow: "unset", width: "100%" }}
              >
                <AccordionSummary
                  className="accordion-summary-item"
                  onClick={() => setFoodId(item.id)}
                  style={{
                    justifyContent: "center",
                    maxHeight: 100,
                    alignItems: "center",
                  }}
                  expandIcon={
                    <ExpandMoreIcon style={{ color: "hsl(14, 88%, 65%)" }} />
                  }
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  {" "}
                  <Button
                    className="login-btn btn-add"
                    onClick={(event) => {
                      event.stopPropagation();
                      addFoodToProfile(item.id);
                      getFoodsCount();
                    }}
                  >
                    add
                  </Button>
                  <ResultItem
                    onMouseEnter={changeColorEnter}
                    onMouseLeave={changeColorLeave}
                    handleChangeExpand={handleChangeExpand}
                    setExpanded={setExpanded}
                    className={classes.heading}
                    id={item.id}
                    name={item.name}
                    image={item.image}
                  />
                </AccordionSummary>
                <AccordionDetails style={{ justifyContent: "center" }}>
                  <Typography className={classes.paragraph}>
                    <Grid>
                      <Grid container className="result-nutrients-container">
                        {searchNutrients ? (
                          <ChartItem
                            searchNutrients={searchNutrients}
                            weightPerServing={weightPerServing}
                          />
                        ) : null}
                      </Grid>
                    </Grid>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Grid>
            {arr.length - 1 === index && arr.length - 1 < totalResults - 1 ? (
              <Button onClick={appendNextTenFoods} className="btn-loadmore">
                Load more...
              </Button>
            ) : null}
          </Grid>
        ))
      ) : null}
    </MuiThemeProvider>
  );
}
