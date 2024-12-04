import { useNavigate } from "react-router-dom";
import api from "../api";
import { DataDish, DataDrink, Dish, Drink, Bill } from "../types";

export const GetDish = async (page?: string): Promise<DataDish> => {
  let data: DataDish = {
    data: [],
    movement: { prev: "", next: "" },
  };
  const site_page = page?.split("/?")[1] ?? "";
  const url = site_page ? `app/home/dish/?${site_page}` : `app/home/dish/`;
  await api
    .get(url)
    .then((response) => {
      return response.data;
    })
    .then((res) => {
      return (data = {
        data: res.results,
        movement: { prev: res.previous, next: res.next },
      });
    })
    .catch((error) => alert(error));
  return data;
};

export const GetDrink = async (page?: string): Promise<DataDrink> => {
  let data: DataDrink = {
    data: [],
    movement: { prev: "", next: "" },
  };
  const site_page = page?.split("/?")[1] ?? "";
  const url = site_page ? `app/home/drink/?${site_page}` : `app/home/drink/`;
  await api
    .get(url)
    .then((response) => {
      return response.data;
    })
    .then((res) => {
      return (data = {
        data: res.results,
        movement: { prev: res.previous, next: res.next },
      });
    })
    .catch((error) => alert(error));
  return data;
};

export const fetchDetails = (type: string, id: string) => {
  const navigator = useNavigate();
  return api
    .get(`/app/home/${type}/${id}/`)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((err) => {
      console.log(`Something wrong with get ${type}` + err);
      navigator("/error/");
      throw err;
    });
};

export const getGuestDish = async (items: number[]): Promise<Dish[]> => {
  try {
    const responses = await Promise.all(
      items.map((e) => api.get(`/app/home/dish/${e}/`))
    );
    return responses.map((response) => response.data);
  } catch (err) {
    console.error("Something wrong with get specific dishes", err);
    throw err;
  }
};
export const getGuestDrink = async (items: number[]): Promise<Drink[]> => {
  try {
    const responses = await Promise.all(
      items.map((e) => api.get(`/app/home/drink/${e}/`))
    );
    return responses.map((response) => response.data);
  } catch (err) {
    console.error("Something wrong with get specific drink", err);
    throw err;
  }
};

export const getBill = async (): Promise<Bill> => {
  const bill = localStorage.getItem("bill");
  return await api
    .get(`/app/bill/${bill}/`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log("Wrong query for get bill " + err);
      throw err;
    });
};
