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
    <table style={{ width: "100%", textAlign: "center" }}>
      <thead>
        <tr style={{ outline: "1px solid black" }}>
          {props.table.map((tableId) => (
            <th key={tableId}>Table - {tableId}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          {props.table.map((tableId) => (
            <td key={tableId}>
              {/* Użycie WaiterDish */}
              <h3>Dishes:</h3>
              <WaiterDish
                dish={getDishesForTable(tableId)}
                setDish={props.setDish}
              />

              {/* Użycie WaiterDrinks */}
              <h3>Drinks:</h3>
              <WaiterDrinks
                drink={getDrinksForTable(tableId)}
                setDrink={props.setDrink}
              />
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default WaiterTable;
