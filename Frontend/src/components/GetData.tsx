import { useNavigate } from "react-router-dom";
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

export const fetchDetails = (type: string, id: string) => {
  const navigator = useNavigate();
  try {
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
  } catch (err) {
    console.log("Wrong with url " + err);
  }
};
