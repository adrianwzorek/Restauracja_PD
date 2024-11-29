import React, { useEffect } from "react";
import { GetDish } from "../components/GetData";
import ChangePage from "../components/ChangePage";

const Dishes = () => {
  const [listOfDishes, move] = GetDish();
  console.log(listOfDishes, move);
  return (
    <ul>
      <h2>List of Dishes</h2>
      <ChangePage next={move.next} prev={move.prev} />
      {listOfDishes.map((e, id) => {
        return (
          <li key={id}>
            <h3 className="title">{e.title}</h3>
            <p className="cost">{e.cost}zł</p>
            <p className="description">{e.description}</p>
            <div className="allergens">
              {e.has_allergen.map((e1, id2) => {
                return <p key={id2}>{e1}</p>;
              })}
            </div>
            <p className="weight">{e.portion_weight}g</p>
          </li>
        );
      })}
    </ul>
  );
};

export default Dishes;
