import React, { useEffect, useState } from "react";
import { Bill, BillDish, BillDrink, Dish, Drink } from "../types";
import {
  getBill,
  getGuestDish,
  getGuestDrink,
  numberOfDish,
  numberOfDrink,
} from "../components/GetData";
import DishesList from "../components/DishesList";
import DrinksList from "../components/DrinksList";
import api from "../api";
import { useNavigate } from "react-router-dom";
import "../css/bill.css";

const GuestBill = (props: { setBill: Function }) => {
  const [order, setOrder] = useState<Bill>();
  const [dishes, setDishes] = useState<Dish[]>();
  const [drinks, setDrinks] = useState<Drink[]>();
  const [billDrink, setBillDrink] = useState<BillDrink[]>();
  const [billDish, setBillDish] = useState<BillDish[]>();
  const navigator = useNavigate();

  const fetchOrder = async () => {
    const res = await getBill();
    setOrder(res);
    const bdish = await numberOfDish();
    setBillDish(bdish);
    const bdrink = await numberOfDrink();
    setBillDrink(bdrink);
    const dish = await getGuestDish(bdish);
    setDishes(dish);
    const drink = await getGuestDrink(bdrink);
    setDrinks(drink);
  };

  const abaddonBill = async () => {
    console.log("Order has been abaddon");
    props.setBill(false);
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

  useEffect(() => {
    fetchOrder();
  }, []);

  const putOutItem = () => {
    alert("good");
  };

  return (
    <>
      <h1>Bill {order?.id_bill}</h1>
      <h2>Dishes</h2>
      <DishesList
        dishes={dishes ?? []}
        putOut={putOutItem}
        numsDish={billDish!}
      />
      <h2>Drinks</h2>
      <DrinksList
        drinks={drinks ?? []}
        putOut={putOutItem}
        numsDrink={billDrink!}
      />
      <h2>
        Full cost <i>{order?.full_cost} zł</i>
      </h2>
      <div className="btn-container">
        <button type="button" onClick={() => abaddonBill()}>
          Cancel
        </button>
        <button type="button" onClick={() => alert("end")}>
          Order
        </button>
      </div>
    </>
  );
};

export default GuestBill;
