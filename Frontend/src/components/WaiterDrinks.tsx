import React, { useEffect, useState } from "react";
import { Bill, BillDrink, Drink } from "../types";
import { getGuestDrink } from "./GetData";
import api from "../api";
import { useNavigate } from "react-router-dom";

const WaiterDrinks = (props: {
  drink: BillDrink[];
  setDrink: Function;
  table: number[];
  bills: Bill[];
}) => {
  const [drink, setDrink] = useState<Drink[]>();
  const navigator = useNavigate();
  const fetch = async () => {
    const item = await getGuestDrink(props.drink);
    setDrink(item);
  };
  useEffect(() => {
    fetch();
  }, [props.drink]);

  const itemOut = async (type: string, item: BillDrink) => {
    try {
      const response = await api.put(
        `app/bill_${type}/${item.id_bill}/${item.id_drink}/`,
        { isReady: true }
      );

      console.log(response);
    } catch (err) {
      console.log("Something went wrong with itemOut " + err);
      throw err;
    }

    navigator("/login/");
  };

  return (
    <div>
      <h1>Drinks</h1>
      {drink?.map((e, id) => {
        return !props.drink[id].isReady ? (
          <div key={id}>
            {e.image ? (
              <img src={import.meta.env.VITE_BASE_URL + e.image} alt={e.name} />
            ) : (
              ""
            )}
            <p>{e.name}</p>
            <p>bill - {props.drink[id].id_bill}</p>
            <p>number - {props.drink[id].number}</p>
            <button onClick={() => itemOut("drink", props.drink[id])}>
              Zakończ
            </button>
          </div>
        ) : (
          ""
        );
      })}
    </div>
  );
};

export default WaiterDrinks;
