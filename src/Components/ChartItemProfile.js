import React from "react";
import { HorizontalBar } from "react-chartjs-2";
import { Grid, Typography } from "@material-ui/core";

// defaults.global.tooltips.enabled = false;
// defaults.global.legend.position = "bottom";

const ChartItemProfile = ({
  searchNutrientsProfile,
  weightPerServingProfile,
}) => {
  let protein =
    searchNutrientsProfile !== null ? searchNutrientsProfile.Protein.amount : 0;
  let calories =
    searchNutrientsProfile !== null
      ? searchNutrientsProfile.Calories.amount
      : 0;
  let carbs =
    searchNutrientsProfile !== null || undefined
      ? searchNutrientsProfile.Carbohydrates.amount
      : 0;

  let totalFat =
    searchNutrientsProfile !== null || undefined
      ? searchNutrientsProfile.Fat.amount
      : 0;
  let sugar =
    searchNutrientsProfile !== null && undefined
      ? searchNutrientsProfile.Sugar.amount
      : 0;
  let salt =
    searchNutrientsProfile !== null || undefined
      ? searchNutrientsProfile.Sodium.amount
      : 0;
  let weight =
    weightPerServingProfile !== null ? weightPerServingProfile.amount : 0;

  return (
    <div>
      {" "}
      <Grid>{/* <Typography>Calories: {calories}kcal</Typography> */}</Grid>
      <Grid>
        <HorizontalBar
          className="chart-item"
          data={{
            labels: ["Protein", "Carbohydrates", "Total Fat", "Salt", "Sugar"],
            datasets: [
              {
                label: "Grams",
                data: [protein, carbs, totalFat, salt, sugar],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
              },
              // {
              //   label: "Calories",
              //   data: [47],
              //   backgroundColor: "orange",
              //   borderColor: "red",
              // },
            ],
          }}
          height={400}
          width={600}
          options={{
            maintainAspectRatio: false,
            indexAxis: "y",
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },

            legend: {
              labels: {
                fontSize: 25,
              },
            },
          }}
        />
      </Grid>
    </div>
  );
};

export default ChartItemProfile;
