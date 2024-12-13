import React from "react";
import { Dish } from "../types";

const DishesList = (props: { dishes: Dish[]; putOut: Function }) => {
  return (
    <ul className="drinks-container">
      {props.dishes?.map((e, id) => {
        return (
          <li key={id} className="drink-item">
            <img src={e.image} alt={e.title} />
            <h2>{e.title}</h2>
            <h3>{e.cost} zł</h3>
            <button onClick={() => props.putOut(e.id, "dish")}>Delete</button>
          </li>
        );
      })}
    </ul>
  );
};

export default DishesList;
