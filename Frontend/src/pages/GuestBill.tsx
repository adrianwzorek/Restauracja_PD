import React, { useEffect, useState } from "react";
import { Bill, Dish, Drink } from "../types";
import { getBill, getGuestDish, getGuestDrink } from "../components/GetData";
import DishesList from "../components/DishesList";
import DrinksList from "../components/DrinksList";
import api from "../api";

const GuestBill = () => {
  const [order, setOrder] = useState<Bill>();
  const [dishes, setDishes] = useState<Dish[]>();
  const [drinks, setDrinks] = useState<Drink[]>();

  const fetchOrder = async () => {
    const res = await getBill();
    const dish = await getGuestDish(res.dishes);
    const drink = await getGuestDrink(res.drinks);
    setOrder(res);
    setDishes(dish);
    setDrinks(drink);
  };
  const putOutItem = async (id_item: number, type: string) => {
    let choseType = type === "dish" ? order?.dishes : order?.drinks;
    const item = choseType?.filter((e) => e != id_item);
    if (type === "dish") {
      setOrder((prev) => {
        return {
          ...prev,
          dishes: item,
        } as Bill;
      });
      await api
        .put(`/app/bill/${order?.id_bill}/`, {
          ...order,
          dishes: item,
        })
        .catch((err) => {
          console.log("something wrong with put out the item dish " + err);
          throw err;
        });
      setDishes((prev) => prev?.filter((e) => e.id_dish != id_item));
    }
    if (type === "drink") {
      setOrder((prev) => {
        return {
          ...prev,
          drinks: item,
        } as Bill;
      });
      await api
        .put(`/app/bill/${order?.id_bill}/`, {
          ...order,
          drinks: item,
        })
        .catch((err) => {
          console.log("something wrong with put out the item drink " + err);
          throw err;
        });
      setDishes((prev) => prev?.filter((e) => e.id_dish != id_item));
    }
  };
  useEffect(() => {
    fetchOrder();
  }, [order]);

  return (
    <div>
      <h1>Bill {order?.id_bill}</h1>
      <h2>Dishes</h2>
      <DishesList dishes={dishes ?? []} putOut={putOutItem} />
      {order?.dishes.map((e) => {
        return <p key={0 + e}>{e}</p>;
      })}
      <h2>Drinks</h2>
      <DrinksList drinks={drinks ?? []} putOut={putOutItem} />
      <h2>
        Full cost <i>{order?.full_cost} zł</i>
      </h2>
      <button type="button" onClick={() => alert("Cancel")}>
        Cancel
      </button>
      <button type="button" onClick={() => alert("Order now")}>
        Order
      </button>
    </div>
  );
};

export default GuestBill;
