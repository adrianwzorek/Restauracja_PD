import React from "react";

import { Bill, BillDish, BillDrink, Dish, Drink } from "../types";
import "../css/waiter.css";
import api from "../api";

const Table = (props: {
  table: number[];
  bills: Bill[];
  billDish: BillDish[];
  billDrink: BillDrink[];
  itemDishes: Dish[];
  itemDrinks: Drink[];
  outDish: Function;
  outDrink: Function;
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

  const filterDrinks = (drink: BillDrink) => {
    const item = props.itemDrinks.find((e) => e.id === drink.id_drink);
    return (
      <>
        <img
          src={import.meta.env.VITE_BASE_URL + item?.image}
          alt={item?.name}
        />
        <p>{item?.name}</p>
        <p>{drink.number}</p>
        <button onClick={() => props.outDrink(drink)}>Done</button>
      </>
    );
  };
  const filterDishes = (dish: BillDish) => {
    const item = props.itemDishes.find((e) => e.id === dish.id_dish);
    return (
      <>
        <img
          src={import.meta.env.VITE_BASE_URL + item?.image}
          alt={item?.title}
        />
        <p>{item?.title}</p>
        <p>{dish.number}</p>
        <button onClick={() => props.outDish(dish)}>Done</button>
      </>
    );
  };

  console.log(props.billDish);
  return (
    <div className="table-list">
      {props.table.map((tableId) => (
        <div key={tableId} className="table-item">
          <h1>Table {tableId}</h1>
          <div className="bills-section">
            <h2>Drinks</h2>
            {getDrinksForTable(tableId).length > 0 ? (
              <ul>
                {getDrinksForTable(tableId).map((drink) =>
                  !drink.isReady ? (
                    <li key={drink.id}>{filterDrinks(drink)}</li>
                  ) : (
                    ""
                  )
                )}
              </ul>
            ) : (
              ""
            )}
          </div>

          <div className="bills-section">
            <h2>Dishes</h2>
            {getDishesForTable(tableId).length > 0 ? (
              <ul>
                {getDishesForTable(tableId).map((dish) =>
                  !dish.isReady ? (
                    <li key={dish.id}>{filterDishes(dish)}</li>
                  ) : (
                    ""
                  )
                )}
              </ul>
            ) : (
              ""
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Table;
