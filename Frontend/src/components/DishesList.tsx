import React from "react";
import { Dish } from "../types";

const DishesList = (props: { dishes: Dish[]; putOut: Function }) => {
  return (
    <ul className="drinks-container">
      {props.dishes?.map((e) => {
        return (
          <li key={e.id_dish} className="drink-item">
            <p>{e.title}</p>
            <img src={`${e.image}`} alt={e.title} />
            <p>{e.cost} zł</p>
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
