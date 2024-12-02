import React from "react";
import { NewBill } from "../components/SetData";

const Bill = () => {
  const createNewBill = async () => {
    try {
      const table = localStorage.getItem("table");
      if (table) {
        await NewBill(table);
      } else {
        alert("No table found in local storage!");
      }
    } catch (err) {
      alert("Failed to create Bill" + err);
    }
  };
  return (
    <div>
      <h1>Welcome in your bill view</h1>
      <button onClick={() => createNewBill()}>Create Bill</button>
    </div>
  );
};

export default Bill;
