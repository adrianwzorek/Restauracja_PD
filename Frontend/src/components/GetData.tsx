import { useEffect, useState } from "react";
import api from "../api";
import { Dish, Drink } from "../types";

export const GetDish = () => {
  const [list, setList] = useState<Dish[]>([]);

  useEffect(() => {
    api
      .get(`app/home/dish/`)
      .then((response) => {
        setList(response.data);
      })
      .catch((error) => alert(error));
  }, []);
  return list;
};

export const GetDrink = () => {
  const [list, setList] = useState<Drink[]>([]);

  useEffect(() => {
    api
      .get(`app/home/drink/`)
      .then((response) => {
        setList(response.data);
      })
      .catch((error) => alert(error));
  }, []);
  return list;
};
