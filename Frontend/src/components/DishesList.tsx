import React from "react";
import { Dish } from "../types";

const DishesList = (props: { dishes: Dish[]; putOut: Function }) => {
  return (
    <ul className="drinks-container">
      {props.dishes?.map((e) => {
        return (
          <li key={e.id_dish} className="drink-item">
            <img src={e.image} alt={e.title} />
            <h2>{e.title}</h2>
            <h3>{e.cost} zł</h3>
            <button onClick={() => props.putOut(e.id_dish, "dish")}>
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default DishesList;
