import React from "react";
import { BillDish, BillDrink } from "../types";
import WaiterDish from "./WaiterDish";
import WaiterDrinks from "./WaiterDrinks";

const WaiterTable = (props: {
  table: number[];
  dish: BillDish[];
  drink: BillDrink[];
  setDrink: Function;
  setDish: Function;
}) => {
  // Funkcja filtrująca dania przypisane do konkretnego stolika
  const getDishesForTable = (tableId: number) => {
    return props.dish.filter((dish) => dish.id_bill === tableId);
  };

  // Funkcja filtrująca napoje przypisane do konkretnego stolika
  const getDrinksForTable = (tableId: number) => {
    return props.drink.filter((drink) => drink.id_bill === tableId);
  };

  return (
    <div>
      <WaiterDrinks drink={props.drink} setDrink={props.setDrink} />
      <WaiterDish dish={props.dish} setDish={props.setDish} />
    </div>
  );
};

export default WaiterTable;
