import React from "react";
import { GetDish, GetDrink } from "../components/GetData";
import { Dish, Drink } from "../types";

const Home = () => {
  const dish: Dish[] = GetDish();
  const drink: Drink[] = GetDrink();
  return (
    <div className="main">
      <h1>Hello and welcome in my Restoration!</h1>
      <div className="dishes-home">
        <h2>Check out Dishes</h2>
        <div className="dishes-items">
          {dish.map((e, id) => {
            return <li key={id}>{e.title}</li>;
          })}
        </div>
      </div>
      <div className="drinks-home">
        <h2>Check out Drinks</h2>
        <div className="drinks-items">
          {drink.map((e, id) => {
            return <li key={id}>{e.name}</li>;
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
