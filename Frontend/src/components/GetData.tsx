import { useEffect, useState } from "react";
import api from "../api";
import { Dish, Drink, Move } from "../types";

export const GetDish = (page?: string): [Dish[], Move] => {
  const [list, setList] = useState<Dish[]>([]);
  const [move, setMove] = useState<Move>({ prev: "", next: "" });
  const site_page = page?.split("/?")[1] ?? "";
  const url = site_page ? `app/home/dish/?${site_page}` : `app/home/dish/`;
  useEffect(() => {
    api
      .get(url)
      .then((response) => {
        setList(response.data.results);
        setMove({ prev: response.data.previous, next: response.data.next });
      })
      .catch((error) => alert(error));
  }, [page]);

  return [list, move];
};

export const GetDrink = (page?: string): [Drink[], Move] => {
  const [list, setList] = useState<Drink[]>([]);
  const [move, setMove] = useState<Move>({ prev: "", next: "" });
  const site_page = page?.split("/?")[1] ?? "";
  const url = site_page ? `app/home/drink/?${site_page}` : `app/home/drink/`;
  useEffect(() => {
    api
      .get(url)
      .then((response) => {
        setList(response.data.results);
        setMove({ prev: response.data.previous, next: response.data.next });
      })
      .catch((error) => alert(error));
  }, [page]);
  return [list, move];
};
