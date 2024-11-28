import React from "react";
import { GetDish } from "../components/GetData";

const Dishes = () => {
  const listOfDishes = GetDish();
  return (
    <ul>
      <h2>List of Dishes</h2>
      {listOfDishes.map((e, id) => {
        return (
          <li key={id}>
            <p className="title">{e.title}</p>
            <p className="cost">{e.cost}zł</p>
            <p className="description">{e.description}</p>
            <p className="allergens">{e.has_allergen}</p>
            <p className="weight">{e.portion_weight}g</p>
          </li>
        );
      })}
    </ul>
  );
};

export default Dishes;
