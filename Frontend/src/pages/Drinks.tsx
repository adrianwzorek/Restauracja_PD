import React from "react";
import { GetDrink } from "../components/GetData";

const Drinks = () => {
  const listOfDrinks = GetDrink();
  return (
    <ul>
      {listOfDrinks.map((e, id) => {
        return (
          <li key={id}>
            <p className="name">{e.name}</p>
            <p className="cost">{e.cost}zł</p>
            <p className="type">{e.type}</p>
            <p className="description">{e.description}</p>
            <p className="weight">{e.weight}ml</p>
          </li>
        );
      })}
    </ul>
  );
};

export default Drinks;
