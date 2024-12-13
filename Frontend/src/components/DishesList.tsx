import React, { useEffect, useState } from "react";
import { BillDish, Dish } from "../types";

const DishesList = (props: {
  dishes: Dish[];
  putOut: Function;
  numsDish: BillDish[];
}) => {
  const [item, setItem] = useState<Dish[]>();

  useEffect(() => {
    const one = props.numsDish;
    console.log(one);
  }, []);
  console.log(item);
  return (
    <ul className="dish-container">
      {props.dishes?.map((e, id) => {
        return (
          <li key={id} className="dish-item">
            {e.image ? <img src={e.image} alt={e.title} /> : ""}
            <h2>{e.title}</h2>
            <h2>{props.numsDish[id].number}</h2>
            <h3>{e.cost * props.numsDish[id].number} zł</h3>
            <button onClick={() => props.putOut(e.id, "dish")}>Delete</button>
          </li>
        );
      })}
    </ul>
  );
};

export default DishesList;
