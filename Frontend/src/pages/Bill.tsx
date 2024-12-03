import React from "react";
import { NewBill } from "../components/SetData";

const Bill = (props: { haveBill: boolean; setBill: Function }) => {
  const createNewBill = async () => {
    try {
      const table = localStorage.getItem("table");
      if (table) {
        await NewBill(table);
        props.setBill(true);
      } else {
        alert("No table found in local storage!");
      }
    } catch (err) {
      alert("Failed to create Bill" + err);
    }
  };
  return props.haveBill ? (
    <div>
      <h1>Welcome in your bill view</h1>
    </div>
  ) : (
    <div>
      <h1>Welcome in your bill view</h1>
      <h2>Right now you do not have a bill</h2>
      <button onClick={() => createNewBill()}>Create Bill</button>
    </div>
  );
};

export default Bill;
