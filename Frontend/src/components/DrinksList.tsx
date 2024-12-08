import React from "react";
import { Drink } from "../types";

const DrinksList = (props: { drinks: Drink[]; putOut: Function }) => {
  return (
    <ul>
      {props.drinks?.map((e) => {
        return (
          <li key={e.id_drink}>
            <p>{e.name}</p>
            <p>{e.cost}</p>
            <button onClick={() => props.putOut(e.id_drink, "drink")}>
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default DrinksList;
