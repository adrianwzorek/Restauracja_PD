import React from "react";
import { NewBill } from "../../components/SetData";
import GuestBill from "./GuestBill";
import "../../css/bill.css";

const Bill = (props: { haveBill: boolean; setBill: Function }) => {
  const table = localStorage.getItem("table");
  const createNewBill = async () => {
    if (table) {
      await NewBill();
      props.setBill(true);
    } else {
      alert("No table found, Please speak to one of our employee");
    }
  };

  return (
    <div className="bill-container">
      {props.haveBill ? (
        <>
          <h1>Welcome in your bill view</h1>
          <GuestBill setBill={props.setBill} />
        </>
      ) : (
        <>
          <h1>Right now you do not have a bill</h1>
          <button onClick={() => createNewBill()}>Create Bill</button>
        </>
      )}
    </div>
  );
};

export default Bill;
