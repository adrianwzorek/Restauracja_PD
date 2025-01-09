import React, { useEffect, useState } from "react";

import { Bill, BillDish, BillDrink, Dish, Drink, Guest } from "../types";
import "../css/waiter.css";
import { billAbaddon, billDone } from "./SetData";

const Table = (props: {
  table: number[];
  bills: Bill[];
  billDish: BillDish[];
  billDrink: BillDrink[];
  itemDishes: Dish[];
  itemDrinks: Drink[];
  checkBill: Bill[];
  guest: Guest[];
  setGuest: Function;
  outDish: Function;
  outDrink: Function;
  done: Function;
  abaddon: Function;
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
        <h2>
          {item?.name} x{drink.number}
        </h2>
        <h3>Bill - {drink.id_bill}</h3>
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
        <h2>
          {item?.title} x{dish.number}
        </h2>
        <h3> Bill - {dish.id_bill}</h3>

        <button onClick={() => props.outDish(dish)}>Done</button>
      </>
    );
  };

  return (
    <div className="table-list">
      <ul className="bill-done">
        {props.checkBill?.map((e) => {
          return (
            <li key={e.id}>
              <h1>
                Table - {e.table} Bill -{e.id}
              </h1>
              <h2>{e.date.toString()}</h2>
              <h3>Pay-{e.full_cost}zł</h3>
              <div className="btn-container">
                <button onClick={() => props.abaddon(e)}>Abaddon</button>
                <button onClick={() => props.done(e)}>Done</button>
              </div>
            </li>
          );
        })}
      </ul>

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
