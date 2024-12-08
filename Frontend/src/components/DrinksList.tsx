import React from "react";
import { Drink } from "../types";

const DrinksList = (props: { drinks: Drink[]; putOut: Function }) => {
  return (
    <ul className="drink-container">
      {props.drinks?.map((e) => {
        return (
          <li key={e.id_drink} className="drink-item">
            <img
              src={`${import.meta.env.VITE_BASE_URL + e.image}`}
              alt={e.name}
            />
            <p>{e.name}</p>
            <p>{e.cost} zł</p>
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
