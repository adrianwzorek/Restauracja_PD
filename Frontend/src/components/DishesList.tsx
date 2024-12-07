import React, { useEffect, useState } from "react";
import { getGuestDish } from "./GetData";
import { Bill, Dish } from "../types";
import api from "../api";

const DishesList = (props: { billOrder: Bill; setOrder: Function }) => {
  const [dishes, setDishes] = useState<Dish[]>();
  useEffect(() => {
    const fetchBill = async () => {
      const dish = await getGuestDish(props.billOrder?.dishes);
      setDishes(dish);
    };
    fetchBill();
  }, [props.billOrder]);

  const putOutItem = async (id_item: number) => {
    const item = props.billOrder?.dishes.filter((e) => e != id_item);
    props.setOrder((prev: Bill) => {
      return {
        ...prev,
        dishes: item,
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
    setDishes((prev) => prev?.filter((e) => e.id_dish != id_item));
  };

  // ? Console log
  // console.log(dishes);

  return (
    <ul>
      {dishes?.map((e) => {
        return (
          <li key={e.id_dish}>
            <p>{e.title}</p>
            <p>{e.cost} zł</p>
            <button onClick={() => putOutItem(e.id_dish)}>Delete</button>
          </li>
        );
      })}
    </ul>
  );
};

export default DishesList;
