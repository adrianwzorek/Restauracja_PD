import React from "react";
import api from "../api";

export const NewBill = async (id_table: string) => {
  const res = await api
    .put(`app/login/${id_table}/`, {})
    .then((response) => {
      localStorage.setItem("guest", response.data.Guest);
      localStorage.setItem("bill", response.data.bill);
      localStorage.removeItem("table");
    })
    .catch((err) => {
      console.log("Wrong put request" + err);
      throw err;
    });
  return res;
};
