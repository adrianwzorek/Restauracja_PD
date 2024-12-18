import React from "react";
import api from "../api";

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
