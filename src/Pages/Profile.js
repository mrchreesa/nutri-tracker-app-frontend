import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import data from "../RDI/DataRDI.json";
import "../Profile.css";
import ProfileFoodItem from "../Results/ProfileFoodItem";
import ChartItemProfile from "../Components/ChartItemProfile";
import ProfileStats from "../Results/ProfileStats";
import { useAuthedProfile } from "../Context/AuthedProfileContext";

import {
  Grid,
  MuiThemeProvider,
  Button,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@material-ui/core";
import { useStyles, THEME } from "../Styles/StylesAccordion";
import { Skeleton } from "@material-ui/lab";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import axios from "axios";

export default function Profile(props) {
  const [foodsInProfile, setFoodsInProfile] = useState([]);
  const [isLoadingProf, setIsLoadingProf] = useState(false);
  const [searchNutrientsProfile, setSearchNutrientsProfile] = useState(null);
  const [weightPerServingProfile, setWeightPerServingProfile] = useState(null);
  const { authedProfile, setAuthedProfile } = useAuthedProfile();
  const classes = useStyles();

  useEffect(() => {
    getFoodsProfile();
  }, []);

  const getFoodsProfile = () => {
    setIsLoadingProf(true);
    let username;
    {
      authedProfile
        ? (username = authedProfile.username)
        : (username = authedProfile);
    }
    axios
      .get(`users/${username}`)
      .then((response) => {
        console.log(response.data[0]);

        const result = response.data[0].ingredients;
        setFoodsInProfile(result);
        setIsLoadingProf(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getNutrientsByIdProfile = (foodIdProfile) => {
    axios
      .get(`ingredients/${foodIdProfile}`)
      .then((response) => {
        const resultNutritionData = response.data.nutrition.nutrients;
        const weightPerServing = response.data.nutrition.weightPerServing;
        let newNutrients = {};
        resultNutritionData.forEach((item, index) => {
          newNutrients[item.name] = item;
        });
        console.log(newNutrients);

        if (resultNutritionData) {
          setSearchNutrientsProfile(newNutrients);
        }
        if (weightPerServing) {
          setWeightPerServingProfile(weightPerServing);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [expanded, setExpanded] = useState("panel1");

  const changeColorEnter = (event) => {
    event.target.style.color = "hsl(14, 88%, 65%)";
  };
  const changeColorLeave = (event) => {
    event.target.style.color = "hsl(237, 12%, 33%)";
  };
  const handleChangeExpand = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const deleteFoodFromProfile = (id) => {
    axios
      .patch(`/users/${authedProfile.username}/ingredients/${id}`)
      .then((response) => {
        console.log(response);
        getFoodsProfile();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <MuiThemeProvider theme={THEME}>
      <Grid
        container
        className="container-profile"
        style={{ position: "relative" }}
      >
        <Grid
          className="btn-container-prof"
          style={{ width: "100%", display: "flex" }}
        >
          <Link
            //   className="btn-back "
            to="/search"
            style={{ textDecoration: "none" }}
          >
            <Button className=" btn-back">
              <ArrowBackIosIcon fontSize="small" />
              Search
            </Button>
          </Link>
          <div className="empty"></div>
          <Link to="/">
            <Button className="btn-logo2">
              <img
                className="logo2 logo-prof"
                src="../../newlogo123.png"
                alt="logo2"
              />
            </Button>
          </Link>
          <div className="empty"></div>

          <Button
            className="login-btn"
            style={{ height: "max-content", margin: 20 }}
          >
            Log out
          </Button>
        </Grid>{" "}
        <ProfileStats foodsInProfile={foodsInProfile} />
        {isLoadingProf ? (
          <>
            <Skeleton className="skeleton" animation="wave" />
            <Skeleton className="skeleton" animation="wave" />
          </>
        ) : foodsInProfile.length ? (
          foodsInProfile.map((item, index) => (
            <Grid
              item
              container
              className="result-list-container profile-list-container"
            >
              <Grid className={classes.accordionContainer} item>
                <Accordion
                  expanded={expanded === index}
                  onChange={handleChangeExpand(index)}
                  style={{ boxShadow: "unset", width: "100%" }}
                >
                  <AccordionSummary
                    onClick={() => {
                      getNutrientsByIdProfile(item.ingredient.foodId);
                    }}
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
                        deleteFoodFromProfile(item._id);
                        console.log(item._id);
                      }}
                    >
                      Delete
                    </Button>
                    <ProfileFoodItem
                      onMouseEnter={changeColorEnter}
                      onMouseLeave={changeColorLeave}
                      handleChangeExpand={handleChangeExpand}
                      setExpanded={setExpanded}
                      className={classes.heading}
                      id={item.ingredient.id}
                      name={item.ingredient.name}
                      imageName={item.ingredient.imageName}
                    />
                  </AccordionSummary>
                  <AccordionDetails style={{ justifyContent: "center" }}>
                    <Typography className={classes.paragraph}>
                      <Grid>
                        <Grid container className="result-nutrients-container">
                          <ChartItemProfile
                            searchNutrientsProfile={searchNutrientsProfile}
                            weightPerServingProfile={weightPerServingProfile}
                          />
                        </Grid>
                      </Grid>
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            </Grid>
          ))
        ) : null}
      </Grid>
    </MuiThemeProvider>
  );
}
