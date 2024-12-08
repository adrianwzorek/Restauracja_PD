import React from "react";
import { Dish } from "../types";

const DishesList = (props: { dishes: Dish[]; putOut: Function }) => {
  // ? Console log
  // console.log(dishes);

  return (
    <ul>
      {props.dishes?.map((e) => {
        return (
          <li key={e.id_dish}>
            <p>{e.title}</p>
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
