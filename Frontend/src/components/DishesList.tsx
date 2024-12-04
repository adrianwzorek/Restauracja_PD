import React, { useEffect, useState } from "react";
import { getBill, getGuestDish } from "./GetData";
import { Dish } from "../types";

const DishesList = () => {
  const [dishes, setDishes] = useState<Dish[]>();

  useEffect(() => {
    const fetchBill = async () => {
      const order = await getBill();
      const dish = getGuestDish(order.dishes);
      setDishes(await dish);
    };
    fetchBill();
  }, []);
  console.log(dishes);
  return (
    <ul>
      {dishes?.map((e) => {
        return (
          <li key={e.id_dish}>
            <p>{e.title}</p>
            <p>{e.cost}</p>
            <button onClick={() => alert("delete view")}>Delete</button>
          </li>
        );
      })}
    </ul>
  );
};

export default DishesList;
