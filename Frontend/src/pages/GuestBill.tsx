import React, { useEffect, useState } from "react";
import { Bill, Dish, Drink } from "../types";
import { getBill, getGuestDish, getGuestDrink } from "../components/GetData";
import DishesList from "../components/DishesList";
import DrinksList from "../components/DrinksList";
import api from "../api";
import { useNavigate } from "react-router-dom";

const GuestBill = () => {
  const [order, setOrder] = useState<Bill>();
  const [dishes, setDishes] = useState<Dish[]>();
  const [drinks, setDrinks] = useState<Drink[]>();
  const navigator = useNavigate();

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
  const abaddonBill = async () => {
    console.log("Order has been abaddon");
    localStorage.clear();
    setOrder((prev) => {
      return {
        ...prev,
        abandoned: true,
      } as Bill;
    });
    await api
      .put(`app/bill/${order?.id_bill}/`, {
        ...order,
        abandoned: true,
        done: false,
      })
      .then(() => {
        return navigator("/bill/abaddon/");
      })
      .catch((err) => {
        console.log("Can not change the bill " + err);
        throw err;
      });
  };
  const endOrder = async () => {
    if (order?.dishes.length === 0 && order?.drinks.length === 0) {
      alert("You do not have any item on your bill");
      return;
    }
    console.log("Order has been done");
    setOrder((prev) => {
      return {
        ...prev,
        done: true,
      } as Bill;
    });
    await api
      .put(`app/bill/${order?.id_bill}/`, {
        ...order,
        done: true,
        abandoned: false,
      })
      .then(() => {
        return navigator("/bill/done/");
      })
      .catch((err) => {
        console.log("Can not change the bill " + err);
        throw err;
      });
  };

  useEffect(() => {
    fetchOrder();
  }, [order]);

  return (
    <div>
      <h1>Bill {order?.id_bill}</h1>
      <h2>Dishes</h2>
      <DishesList dishes={dishes ?? []} putOut={putOutItem} />
      <h2>Drinks</h2>
      <DrinksList drinks={drinks ?? []} putOut={putOutItem} />
      <h2>
        Full cost <i>{order?.full_cost} zł</i>
      </h2>
      <div className="btn-container">
        <button type="button" onClick={() => abaddonBill()}>
          Cancel
        </button>
        <button type="button" onClick={() => endOrder()}>
          Order
        </button>
      </div>
    </div>
  );
};

export default GuestBill;
