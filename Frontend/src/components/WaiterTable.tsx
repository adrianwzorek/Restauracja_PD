import React from "react";

import { Bill, BillDish, BillDrink } from "../types";
import "../css/waiter.css";

const Table = (props: {
  table: number[];
  bills: Bill[];
  billDish: BillDish[];
  billDrink: BillDrink[];
}) => {
  // Funkcja filtrująca dania przypisane do konkretnego stolika
  const getDishesForTable = (tableId: number) => {
    return props.billDish.filter((dish) => {
      const bill = props.bills.find((b) => b.id === dish.id_bill);
      return bill?.table === tableId;
    });
  };

  // Funkcja filtrująca napoje przypisane do konkretnego stolika
  const getDrinksForTable = (tableId: number) => {
    return props.billDrink.filter((drink) => {
      const bill = props.bills.find((b) => b.id === drink.id_bill);
      return bill?.table === tableId;
    });
  };

  console.log(props.billDish);

  return (
    <div className="table-list">
      {props.table.map((tableId) => (
        <div key={tableId} className="table-item">
          <h1>Table {tableId}</h1>
          <div className="bills-section">
            <h2>Dishes</h2>
            {getDishesForTable(tableId).length > 0 ? (
              <ul>
                {getDishesForTable(tableId).map((dish) =>
                  !dish.isReady ? (
                    <li key={dish.id_dish || dish.id}>
                      <p>Dish ID: {dish.id_dish}</p>
                      <p>Number: {dish.number}</p>
                    </li>
                  ) : (
                    ""
                  )
                )}
              </ul>
            ) : (
              <p>No dishes for this table.</p>
            )}
          </div>

          <div className="bills-section">
            <h2>Drinks</h2>
            {getDrinksForTable(tableId).length > 0 ? (
              <ul>
                {getDrinksForTable(tableId).map((drink) => (
                  <li key={drink.id}>
                    <p>Drink ID: {drink.id_drink}</p>
                    <p>Number: {drink.number}</p>
                    <p>Status: {drink.isReady ? "Ready" : "Not Ready"}</p>
                    <button onClick={() => alert("DOne")}>DONE</button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No drinks for this table.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Table;
