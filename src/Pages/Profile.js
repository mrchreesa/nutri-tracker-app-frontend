import React, { useState } from "react";
import { Link } from "react-router-dom";

import data from "../RDI/DataRDI.json";
import "../Profile.css";

import { Grid, MuiThemeProvider, Button } from "@material-ui/core";
import { useStyles, THEME } from "../Styles/StylesAccordion";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

export default function Profile() {
  const [tab, setTab] = useState("daily");
  const toggleTab = (event) => {
    setTab(event.target.id);
  };

  const classes = useStyles();

  //   const toggleTittleId = (tittleId) => {
  //     if (tab === "daily") {
  //       return data;
  //     } else if (tab === "weekly") {
  //       return data;
  //     } else if (tab === "monthly") {
  //       return data;
  //     }
  //   };
  //   const newData = data.map((data) => {
  //     return (
  //       <div>
  //         <div>
  //           <h5>{data.title}</h5>
  //           <h1>{data.timeframes.daily.current}hrs</h1>
  //           <p>Yesterday - {data.timeframes.daily.previous}hrs</p>
  //         </div>
  //       </div>
  //     );
  //   });
  //   const newDataWeekly = data.map((data) => {
  //     return (
  //       <div>
  //         <div>
  //           <h5>{data.title}</h5>
  //           <h1>{data.timeframes.weekly.current}hrs</h1>
  //           <p>Last Week - {data.timeframes.weekly.previous}hrs</p>
  //         </div>
  //       </div>
  //     );
  //   });
  //   const newDataMonthly = data.map((data) => {
  //     return (
  //       <div>
  //         <div>
  //           <h5>{data.title}</h5>
  //           <h1>{data.timeframes.monthly.current}hrs</h1>
  //           <p>Last Month - {data.timeframes.monthly.previous}hrs</p>
  //         </div>
  //       </div>
  //     );
  //   });

  return (
    <MuiThemeProvider theme={THEME}>
      <Grid container item className="container-profile">
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

        <div className="container">
          <div className="item1" id="main">
            <div className="infoWrapper">
              <p>Report for</p>
              <h2>
                Jeremy <br></br> Robson
              </h2>
            </div>
            <div className="item11" id="main11">
              <ul>
                <li>
                  <button id="daily" onClick={toggleTab}>
                    Daily
                  </button>
                </li>
                <li>
                  <button id="weekly" onClick={toggleTab}>
                    Weekly
                  </button>
                </li>
                <li>
                  <button id="monthly" onClick={toggleTab}>
                    Monthly
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="item2">
            <h4>Calories</h4>
            <div className="item11">
              <h3>{data.calories}kcal</h3>
            </div>
          </div>
          <div className="item3">
            <h4>Protein</h4>

            <div className="item11">
              <h3> {data.protein}g</h3>
            </div>
          </div>
          <div className="item4">
            <h4>Poly Unsaturated Fat</h4>

            <div className="item11">
              <h3> {data.protein}g</h3>
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
              <h3>{data.carbohydrate}g</h3>
            </div>
          </div>
          <div className="item7">
            <h4>Mono Unsaturated Fat</h4>

            <div className="item11">
              <h3> {data.saturates}g</h3>
            </div>
          </div>
        </div>
      </Grid>
      <Grid className="food-items-profile"></Grid>
    </MuiThemeProvider>
  );
}
