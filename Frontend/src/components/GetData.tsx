import { useNavigate } from "react-router-dom";
import api from "../api";
import {
  DataDish,
  DataDrink,
  Dish,
  Drink,
  Bill,
  Allergen,
  BillDish,
  BillDrink,
  Guest,
} from "../types";

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

export const fetchDetails = async (type: string, id: string) => {
  const navigator = useNavigate();
  return await api
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

export const numberOfDish = async () => {
  const bill = Number(localStorage.getItem("bill"));
  if (!bill) return [];
  return await api
    .get(`app/bill_dish/`)
    .then((res) => {
      return res.data;
    })
    .then((data: BillDish[]) => {
      return data.filter((e) => e.id_bill === bill);
    })
    .catch((err) => {
      console.log("get billDish " + err);
      throw err;
    });
};

export const numberOfDrink = async () => {
  const bill = Number(localStorage.getItem("bill"));
  if (!bill) return [];
  return await api
    .get(`app/bill_drink/`)
    .then((res) => {
      return res.data;
    })
    .then((data: BillDish[]) => {
      return data.filter((e) => e.id_bill === bill);
    })
    .catch((err) => {
      console.log("get billDrink " + err);
      throw err;
    });
};

export const getGuestDish = async (items: BillDish[]): Promise<Dish[]> => {
  if (!items) return [];
  try {
    const responses = await Promise.allSettled(
      items.map((e) => api.get(`/app/home/dish/${e.id_dish}/`))
    );
    return responses
      .filter((result) => result.status === "fulfilled")
      .map((data) => data.value.data);
  } catch (err) {
    console.error("Something wrong with get specific dishes", err);
    throw err;
  }
};

export const getGuestDrink = async (items: BillDrink[]): Promise<Drink[]> => {
  try {
    const responses = await Promise.allSettled(
      items.map((e) => api.get(`/app/home/drink/${e.id_drink}/`))
    );
    return responses
      .filter((result) => result.status === "fulfilled")
      .map((data) => data.value.data);
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

export const getDetailsDish = async (id: number): Promise<Dish> => {
  try {
    return await api
      .get(`/app/home/dish/${id}/`)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log("Something wrong with get details" + err);
        throw err;
      });
  } catch (err) {
    console.log("Wrong api " + err);
    throw err;
  }
};

export const getDetailsDrink = async (id: number): Promise<Drink> => {
  try {
    return await api
      .get(`/app/home/drink/${id}/`)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log("Something wrong with get details" + err);
        throw err;
      });
  } catch (err) {
    console.log("Wrong api " + err);
    throw err;
  }
};

export const getAllergen = async (
  id_allergen: number[]
): Promise<Allergen[]> => {
  try {
    const responses = await Promise.all(
      id_allergen.map((e) => api.get(`/app/home/dish/allergen/${e}/`))
    );
    return responses.map((response) => response.data);
  } catch (err) {
    console.error("Something wrong with get specific drink", err);
    throw err;
  }
};

export const getAllBills = async () => {
  const token = localStorage.getItem("access");
  if (!token) return "";
  await api
    .get(`order/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("get Bill waiter " + err);
      throw err;
    });
};

export const getGuests = async (bill: Bill[]): Promise<Guest[]> => {
  try {
    const response = await Promise.allSettled(
      bill.map((e) => api.get(`/app/guest/${e.id}/`))
    );
    return response
      .filter((res) => res.status === "fulfilled")
      .map((data) => data.value.data);
  } catch (err) {
    console.log("something wrong with guest " + err);
    throw err;
  }
};
