import React, { useEffect, useState } from "react";
import { BillDrink, Drink } from "../types";
import { getGuestDrink } from "./GetData";
import api from "../api";
import { useNavigate } from "react-router-dom";

const WaiterDrinks = (props: { drink: BillDrink[]; setDrink: Function }) => {
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
    // Zaktualizuj stan 'drink' w rodzicu (w props.setDrink) po zaktualizowaniu drinka
    props.setDrink((prevDishes: BillDrink[]) =>
      prevDishes?.map((e) =>
        e.id === item.id_drink ? { ...e, isReady: true } : e
      )
    );

    // Opcjonalnie, jeżeli chcesz zaktualizować 'drink' w tym komponencie
    // np. usunąć z listy napój, które zostało przetworzone
    setDrink((prevDrink) => prevDrink?.filter((d) => d.id !== item.id_drink));
    navigator("/login/");
  };

  return (
    <div>
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
              DONE
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
