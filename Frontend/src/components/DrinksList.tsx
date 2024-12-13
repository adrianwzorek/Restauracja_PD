import React from "react";
import { BillDish, Drink } from "../types";

const DrinksList = (props: {
  drinks: Drink[];
  putOut: Function;
  numsDrink: BillDish[];
}) => {
  return (
    <>
      <ul className="drink-container">
        {props.drinks?.map((e, id) => {
          return (
            <li key={id} className="drink-item">
              {e.image ? <img src={e.image} alt={e.name} /> : ""}
              <h2>{e.name}</h2>
              <h3>{e.cost} zł</h3>
              <div className="buttons-container">
                <button onClick={() => props.putOut(e.id, "drink")}>
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default DrinksList;
