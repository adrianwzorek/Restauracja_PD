import React, { useEffect, useState } from "react";
import { Bill, Drink } from "../types";
import { getBill, getGuestDrink } from "./GetData";
import api from "../api";

const DrinksList = (props: { billOrder: Bill; setOrder: Function }) => {
  const [drinks, setDrinks] = useState<Drink[]>();

  useEffect(() => {
    const fetchBill = async () => {
      const order = await getBill();
      const drink = getGuestDrink(order.drinks);
      setDrinks(await drink);
    };
    fetchBill();
  }, []);
  const putOutItem = async (id_item: number) => {
    const item = props.billOrder?.drinks.filter((e: number) => e != id_item);
    props.setOrder((prev: Bill) => {
      return {
        ...prev,
        drinks: item,
      };
    });
    console.log(item);
    await api
      .put(`/app/bill/${props.billOrder?.id_bill}/`, {
        ...props.billOrder,
        dishes: item,
      })
      .catch((err) => {
        console.log("something wrong with put out the item " + err);
        throw err;
      });
    setDrinks((prev) => prev?.filter((e) => e.id_drink != id_item));
  };
  return (
    <ul>
      {drinks?.map((e) => {
        return (
          <li key={e.id_drink}>
            <p>{e.name}</p>
            <p>{e.cost}</p>
            <button onClick={() => putOutItem(e.id_drink)}>Delete</button>
          </li>
        );
      })}
    </ul>
  );
};

export default DrinksList;
function setDishes(arg0: (prev: any) => any) {
  throw new Error("Function not implemented.");
}
