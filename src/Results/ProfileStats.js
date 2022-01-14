import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { useAuthedProfile } from "../Context/AuthedProfileContext";

export default function ProfileStats({ foodsInProfile }) {
  const { authedProfile, setAuthedProfile } = useAuthedProfile();
  const [date, setDate] = useState(null);

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

  let caloriesInProfile = foodsInProfile
    .map((item) => item.ingredient.calories)
    .reduce((acc, item) => acc + item, 0)
    .toFixed(2);

  let proteinInProfile = foodsInProfile
    .map((item) => item.ingredient.protein)
    .reduce((acc, item) => acc + item, 0)
    .toFixed(2);

  let polyUnsaturatedFatInProfile = foodsInProfile
    .map((item) => item.ingredient.polyUnsaturatedFat)
    .reduce((acc, item) => acc + item, 0)
    .toFixed(2);

  let monoUnsaturatedFatInProfile = foodsInProfile
    .map((item) => item.ingredient.monoUnsaturatedFat)
    .reduce((acc, item) => acc + item, 0)
    .toFixed(2);
  let totalFatInProfile = foodsInProfile
    .map((item) => item.ingredient.totalFat)
    .reduce((acc, item) => acc + item, 0)
    .toFixed(2);

  let carbsInProfile = foodsInProfile
    .map((item) => item.ingredient.carbs)
    .reduce((acc, item) => acc + item, 0)
    .toFixed(2);

  // let caloriesInProfile = foodsInProfile
  //               .map((item) => item.ingredient.calories)
  //               .reduce((acc, item) => acc + item, 0).toFixed(2);

  return (
    <Grid container style={{ justifyContent: "center" }}>
      <div className="container">
        <div className="item1" id="main">
          <div className="infoWrapper">
            <p>Report for</p>
            {authedProfile ? (
              <h1>
                {authedProfile.username
                  ? authedProfile.username
                  : authedProfile}
              </h1>
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
            <h3> {totalFatInProfile}g</h3>
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
  );
}
