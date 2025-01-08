import React, { useEffect, useState } from "react";
import { Bill, BillDish } from "../types";
import { billAbaddon, billDone } from "./SetData";

const CheckBill = (props: { bills: Bill[]; billDish: BillDish[] }) => {
  const [checkBill, setCheckBill] = useState<Bill[]>();
  const [dish, setDish] = useState<BillDish[]>();
  const [ref, setRef] = useState(false);
  const check = () => {
    const guest = props.billDish.filter((e) => e.isReady);
    const res = props.bills.filter((e) => {
      return e.abandoned === false && e.done === false;
    });
    let pom = [];
    for (let item of guest) {
      pom.push(...res.filter((e) => e.id === item.id_bill));
    }
    setCheckBill(pom);
  };
  useEffect(() => {
    check();
  }, [props.billDish, props.bills, dish]);

  console.log(checkBill);

  const abaddonBill = (bill: Bill) => {
    setCheckBill((prev) => prev?.filter((e) => e.id !== bill.id));
    billAbaddon(bill);
    setRef(!ref);
  };

  const doneBill = (bill: Bill) => {
    setCheckBill((prev) => prev?.filter((e) => e.id !== bill.id));
    billDone(bill);
    setRef(!ref);
  };

  return (
    <ul className="bill-done">
      {checkBill?.map((e) => {
        return (
          <li key={e.id}>
            <h1>Table - {e.table}</h1>
            <h2>{e.date.toString()}</h2>
            <h3>Pay-{e.full_cost}zł</h3>
            <div className="btn-container">
              <button onClick={() => abaddonBill(e)}>Abaddon</button>
              <button onClick={() => doneBill(e)}>Done</button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default CheckBill;
