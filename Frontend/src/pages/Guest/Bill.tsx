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
      alert("Brak stolika. Proszę zwrócić się do naszego personelu");
    }
  };

  return (
    <div className="bill-container">
      {props.haveBill ? (
        <>
          <h1>Twój rachunek</h1>
          <GuestBill setBill={props.setBill} />
        </>
      ) : (
        <>
          <h1>W tym momencie nie masz otwartego rachunku</h1>
          <button onClick={() => createNewBill()}>Otwórz</button>
        </>
      )}
    </div>
  );
};

export default Bill;
