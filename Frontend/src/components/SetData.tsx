import React from "react";
import api from "../api";
import { Bill } from "../types";

export const NewBill = async () => {
  const table = localStorage.getItem("table");
  const res = await api
    .post(`app/login/${table}/`)
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

export const billAbaddon = async (bill: Bill) => {
  try {
    await api.put(`app/bill/${bill.id}/`, { ...bill, abandoned: true });
    console.log("everything is fine :D");
  } catch (err) {
    console.log("something with put abandon " + err);
    throw err;
  }
};
export const billDone = async (bill: Bill) => {
  try {
    await api.put(`app/bill/${bill.id}/`, { ...bill, done: true });
    console.log("everything is fine :D");
  } catch (err) {
    console.log("something with put abandon " + err);
    throw err;
  }
};
