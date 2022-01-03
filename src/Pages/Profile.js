import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import data from "../RDI/DataRDI.json";
import "../Profile.css";
import ProfileFoodItem from "../Results/ProfileFoodItem";
import ChartItemProfile from "../Components/ChartItemProfile";
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
  const [tab, setTab] = useState("daily");
  const [foodsInProfile, setFoodsInProfile] = useState([]);
  const [date, setDate] = useState(null);
  const [isLoadingProf, setIsLoadingProf] = useState(false);
  const [searchNutrientsProfile, setSearchNutrientsProfile] = useState(null);
  const [weightPerServingProfile, setWeightPerServingProfile] = useState(null);
  const toggleTab = (event) => {
    setTab(event.target.id);
  };
  const classes = useStyles();

  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const d = new Date();
  let day = weekday[d.getUTCDay()];

  useEffect(() => {
    getFoodsProfile();
  }, []);
  const { authedProfile, setAuthedProfile } = useAuthedProfile();
  const getFoodsProfile = () => {
    setIsLoadingProf(true);
    axios
      .get("/ingredients")
      .then((response) => {
        const result = response.data;
        setFoodsInProfile(response.data);
        setIsLoadingProf(false);
        console.log(foodsInProfile);
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

  let caloriesInProfile = foodsInProfile
    .map((item) => item.calories)
    .reduce((acc, item) => acc + item, 0)
    .toFixed(2);

  let proteinInProfile = foodsInProfile
    .map((item) => item.protein)
    .reduce((acc, item) => acc + item, 0)
    .toFixed(2);

  let polyUnsaturatedFatInProfile = foodsInProfile
    .map((item) => item.polyUnsaturatedFat)
    .reduce((acc, item) => acc + item, 0)
    .toFixed(2);

  let monoUnsaturatedFatInProfile = foodsInProfile
    .map((item) => item.monoUnsaturatedFat)
    .reduce((acc, item) => acc + item, 0)
    .toFixed(2);

  let carbsInProfile = foodsInProfile
    .map((item) => item.carbs)
    .reduce((acc, item) => acc + item, 0)
    .toFixed(2);

  // let caloriesInProfile = foodsInProfile
  //               .map((item) => item.calories)
  //               .reduce((acc, item) => acc + item, 0).toFixed(2);

  const deleteFoodFromProfile = (id) => {
    axios
      .delete(`/ingredients/${id}`)
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
        <Grid className="btn-container-prof" style={{ width: "100%" }}>
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
        </Grid>{" "}
        <Grid container style={{ justifyContent: "center" }}>
          <div className="container">
            <div className="item1" id="main">
              <div className="infoWrapper">
                <p>Report for</p>
                {authedProfile ? (
                  <h2>
                    {authedProfile.username
                      ? authedProfile.username
                      : authedProfile}
                  </h2>
                ) : null}
                <div className="empty-div-profile"></div>
                <p>Day</p>
                <h2>{day}</h2>
              </div>
            </div>
            <div className="item2">
              <h4>Calories</h4>
              <div className="item11">
                <h3>{caloriesInProfile}kcal</h3>
              </div>
            </div>
            <div className="item3">
              <h4>Protein</h4>

              <div className="item11">
                <h3> {proteinInProfile}g</h3>
              </div>
            </div>
            <div className="item4">
              <h4>Poly Unsaturated Fat</h4>

              <div className="item11">
                <h3> {polyUnsaturatedFatInProfile}g</h3>
              </div>
            </div>
            <div className="item5">
              <h4>Sugar</h4>

              <div className="item11">
                <h3> {data.sugars}g</h3>
              </div>
            </div>
            <div className="item6">
              <h4>Carbohydrates</h4>

              <div className="item11">
                <h3>{carbsInProfile}g</h3>
              </div>
            </div>
            <div className="item7">
              <h4>Mono Unsaturated Fat</h4>

              <div className="item11">
                <h3> {monoUnsaturatedFatInProfile}g</h3>
              </div>
            </div>
          </div>
        </Grid>
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
                      getNutrientsByIdProfile(item.foodId);
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
                      id={item.id}
                      name={item.name}
                      imageName={item.imageName}
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
