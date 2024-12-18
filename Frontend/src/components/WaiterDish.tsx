import React, { useEffect, useState } from "react";
import { BillDish, Dish } from "../types";
import { getGuestDish } from "./GetData";
import api from "../api";
import { useNavigate } from "react-router-dom";

const WaiterDish = (props: { dish: BillDish[]; setDish: Function }) => {
  const [dish, setDish] = useState<Dish[]>();
  const navigator = useNavigate();
  const fetchDishes = async () => {
    const item = await getGuestDish(props.dish);
    setDish(item);
  };

  useEffect(() => {
    fetchDishes();
  }, [props.dish]);

  const itemOut = async (type: string, item: BillDish) => {
    try {
      const response = await api.put(
        `app/bill_${type}/${item.id_bill}/${item.id_dish}/`,
        { isReady: true }
      );
      console.log(response);
    } catch (err) {
      console.log("Something went wrong with itemOut " + err);
      throw err;
    }
    // Zaktualizuj stan 'dish' w rodzicu (w props.setDish) po zaktualizowaniu dania
    props.setDish((prevDishes: BillDish[]) =>
      prevDishes?.map((e) =>
        e.id === item.id_dish ? { ...e, isReady: true } : e
      )
    );

    // Opcjonalnie, jeżeli chcesz zaktualizować 'dish' w tym komponencie
    // np. usunąć z listy danie, które zostało przetworzone
    setDish((prevDishes) => prevDishes?.filter((d) => d.id !== item.id_dish));
    navigator("/login/");
  };

  return (
    <ul>
      {dish?.map((e, id) => {
        return !props.dish[id].isReady ? (
          <li key={id}>
            {e.image ? <img src={e.image} alt={e.title} /> : ""}
            <p>{e.title}</p>
            <p>number - {props.dish[id].number}</p>
            <p>bill - {props.dish[id].id_bill}</p>
            <button
              className="btn"
              onClick={() => itemOut("dish", props.dish[id])}
            >
              DONE
            </button>
          </li>
        ) : (
          ""
        );
      })}
    </ul>
  );
};

export default WaiterDish;
