import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography } from "@material-ui/core";

const API_KEY = "b5eed59fc04f4aa2a922e46b0541efc9";
const spoonacularAPI = axios.create({
  baseURL: "https://api.spoonacular.com/food/",
});
export default function Joke() {
  const [joke, setJoke] = useState("");

  useEffect(() => {
    getJoke();
  }, []);

  const getJoke = () => {
    const response = spoonacularAPI
      .get(`/jokes/random?number=1&apiKey=${API_KEY}&metaInformation=true.`)
      .then((response) => {
        const resultJoke = response.data.text;
        if (resultJoke) {
          setJoke(resultJoke);
        }
      });
  };

  return (
    <div className="joke-container">
      <Typography
        style={{
          textShadow: "0 0 2px hsl(0 0% 100%/0.9), 0 0 1px currentColor ",
        }}
      >
        {" "}
        <Typography style={{ textAlign: "center" }}>
          Joke of the day:
        </Typography>{" "}
        "{joke}"
      </Typography>
    </div>
  );
}
