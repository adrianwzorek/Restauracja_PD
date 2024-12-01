import api from "../api";
import { DataDish, DataDrink } from "../types";

export const GetDish = async (page?: string): Promise<DataDish> => {
  try {
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
  } catch (error) {
    alert(error);
    throw error;
  }
};

export const GetDrink = async (page?: string): Promise<DataDrink> => {
  try {
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
  } catch (error) {
    alert(error);
    throw error;
  }
};
