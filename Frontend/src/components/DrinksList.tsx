import React, { useEffect, useState } from "react";
import { Drink } from "../types";
import { getBill, getGuestDrink } from "./GetData";

const DrinksList = () => {
  const [drinks, setDrinks] = useState<Drink[]>();

  useEffect(() => {
    const fetchBill = async () => {
      const order = await getBill();
      const drink = getGuestDrink(order.drinks);
      setDrinks(await drink);
    };
    fetchBill();
  }, []);
  console.log(drinks);
  return (
    <ul>
      {drinks?.map((e) => {
        return (
          <li key={e.id_drink}>
            <p>{e.name}</p>
            <p>{e.cost}</p>
            <button onClick={() => alert("delete view")}>Delete</button>
          </li>
        );
      })}
    </ul>
  );
};

export default DrinksList;
