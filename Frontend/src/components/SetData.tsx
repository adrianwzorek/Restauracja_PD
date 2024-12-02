import React from "react";
import api from "../api";

export const NewBill = async (id_table: string) => {
  try {
    const res = await api.put(`app/login/${id_table}/`, {});
    return res;
  } catch (err) {
    console.log(err);
  }
};
