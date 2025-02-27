import React from "react";
import { HorizontalBar } from "react-chartjs-2";
import { Grid, Typography } from "@material-ui/core";

// defaults.global.tooltips.enabled = false;
// defaults.global.legend.position = "bottom";

const ChartItem = ({ searchNutrients, weightPerServing }) => {
	let protein = searchNutrients.Protein !== undefined ? searchNutrients.Protein.amount : 0;
	let calories = searchNutrients.Calories !== undefined ? searchNutrients.Calories.amount : 0;
	let carbs = searchNutrients.Carbohydrates !== undefined ? searchNutrients.Carbohydrates.amount : 0;
	let unsaturatedFat = searchNutrients["Poly Unsaturated Fat"] !== undefined ? searchNutrients["Poly Unsaturated Fat"].amount : 0;
	let saturatedFat = searchNutrients["Saturated Fat"] !== undefined ? searchNutrients["Saturated Fat"].amount : 0;
	let totalFat = searchNutrients.Fat !== undefined ? searchNutrients.Fat.amount : 0;
	let sugar = searchNutrients.Sugar !== undefined ? searchNutrients.Sugar.amount : 0;
	// let salt = searchNutrients.Sodium !== undefined ? searchNutrients.Sodium.amount : 0;
	let weight = weightPerServing !== null ? weightPerServing.amount : 0;
	return (
		<div>
			{" "}
			<Grid>
				<Typography>Weight per serving: {weight}g</Typography>
				<Typography>Calories: {calories}kcal</Typography>
			</Grid>
			<Grid>
				<HorizontalBar
					className="chart-item"
					data={{
						labels: ["Protein", "Carbohydrates", "Total Fat", "Unsaturated Fat", "Saturated Fat", "Sugar"],
						datasets: [
							{
								label: "Grams",
								data: [protein, carbs, totalFat, unsaturatedFat, saturatedFat, sugar],
								backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(153, 102, 255, 0.2)", "rgba(255, 159, 64, 0.2)"],
								borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)", "rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)", "rgba(255, 159, 64, 1)"],
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

export default ChartItem;
