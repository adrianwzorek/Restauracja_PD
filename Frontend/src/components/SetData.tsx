import React from "react";
import api from "../api";
import { getBill } from "./GetData";
import Confirm from "./Confirm";

export const NewBill = async (id_table: string) => {
  const res = await api
    .put(`app/login/${id_table}/`, {})
    .then((response) => {
      localStorage.setItem("guest", response.data.Guest);
      localStorage.setItem("bill", response.data.bill);
      localStorage.removeItem("table");
    })
    .catch((err) => {
      alert("Please contact with our personnel");
      console.log("Wrong put request" + err);
      throw err;
    });
  return res;
};

export const addToBill = async (type: string, item: number) => {
  console.log("work" + type + item);
  // try {
  //   const bill = await getBill();
  //   type === "dish" ? bill.dishes.push(item) : bill.drinks.push(item);
  //   await api
  //     .put(`/app/bill/${bill.id_bill}/`, bill)
  //     .then((response) => {
  //       console.log(response.data);
  //       return response.data;
  //     })
  //     .catch((err) => {
  //       console.log(`Something wrong with put an new item ${err}`);
  //       throw err;
  //     });
  // } catch (err) {
  //   console.log("No such bill " + err);
  //   return "/bill/";
  // }
};
