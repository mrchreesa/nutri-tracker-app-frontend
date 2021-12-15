import React, { useState } from "react";
import {
  Grid,
  Button,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  MuiThemeProvider,
} from "@material-ui/core";
import "../App.css";
import axios from "axios";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useStyles, THEME } from "../Styles/StylesAccordion";

import ResultItem from "./ResultItem";

export default function ResultList({
  result,
  setResult,
  setFoodId,
  foodId,
  appendNextTenFoods,
  searchNutrients,
  totalResults,
}) {
  const [expanded, setExpanded] = useState("panel1");

  const classes = useStyles();
  const changeColorEnter = (event) => {
    event.target.style.color = "hsl(14, 88%, 65%)";
  };
  const changeColorLeave = (event) => {
    event.target.style.color = "hsl(237, 12%, 33%)";
  };
  const handleChangeExpand = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const addFoodToProfile = (foodId) => {
    axios
      .get(`/ingredients/10414003`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <MuiThemeProvider theme={THEME}>
      {result.length
        ? result.map((item, index, arr) => (
            <Grid item container className="result-list-container">
              <Grid className={classes.accordionContainer} item>
                <Accordion
                  expanded={expanded === index}
                  onChange={handleChangeExpand(index)}
                  style={{ boxShadow: "unset", width: "100%" }}
                >
                  <AccordionSummary
                    onClick={() => setFoodId(item.id)}
                    style={{ justifyContent: "center", maxHeight: 100 }}
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
                        addFoodToProfile();
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
                      {/* <Nutrients searchNutrients={item.searchNutrients} /> */}
                      {foodId === 1001033 ? (
                        <p className="nodata-msg">
                          &#128543; OOPS! SORRY NO DATA AVAILABLE... <br />
                          TRY ANOTHER ITEM! &#128524;
                        </p>
                      ) : (
                        ""
                      )}
                      <Grid>
                        <Grid container className="result-nutrients-container">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: searchNutrients,
                            }}
                          />
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
        : null}
    </MuiThemeProvider>
  );
}
