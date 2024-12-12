import React from "react";
import { Drink } from "../types";

const DrinksList = (props: { drinks: Drink[]; putOut: Function }) => {
  return (
    <ul className="drink-container">
      {props.drinks?.map((e) => {
        return (
          <li key={e.id_drink} className="drink-item">
            <img src={e.image} alt={e.name} />
            <h2>{e.name}</h2>
            <h3>{e.cost} zł</h3>
            <div className="buttons-container">
              <button onClick={() => props.putOut(e.id_drink, "drink")}>
                Delete
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default DrinksList;
