import React from "react";
import { GetDrink } from "../components/GetData";
import { ALCOHOL } from "../types";
import ChangePage from "../components/ChangePage";
const Drinks = () => {
  const [listOfDrinks, move] = GetDrink();
  return (
    <ul>
      <h2>List of Drinks</h2>
      <ChangePage next={move.next} prev={move.prev} />
      {listOfDrinks.map((e, id) => {
        return (
          <li key={id}>
            <h3 className="name">{e.name}</h3>
            <p className="cost">{e.cost}zł</p>
            <p className="type">{ALCOHOL(e.type)}</p>
            <p className="description">{e.description}</p>
            <p className="weight">{e.weight}ml</p>
          </li>
        );
      })}
    </ul>
  );
};

export default Drinks;
