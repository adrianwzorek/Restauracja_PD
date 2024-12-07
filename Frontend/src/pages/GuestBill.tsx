import React, { useEffect, useState } from "react";
import { Bill } from "../types";
import { getBill } from "../components/GetData";
import DishesList from "../components/DishesList";
import DrinksList from "../components/DrinksList";

const GuestBill = () => {
  const [order, setOrder] = useState<Bill>();

  useEffect(() => {
    const fetch = async () => {
      const res = await getBill();
      setOrder(res);
    };
    fetch();
  }, []);

  return (
    <div>
      <h1>Bill {order?.id_bill}</h1>
      <h2>Dishes</h2>
      <DishesList billOrder={order!} setOrder={setOrder} />
      {order?.dishes.map((e) => {
        return <p key={0 + e}>{e}</p>;
      })}
      <h2>Drinks</h2>
      <DrinksList billOrder={order!} setOrder={setOrder} />
      <h2>
        Full cost <i>{order?.full_cost} zł</i>
      </h2>
      <button type="button" onClick={() => alert("Cancel")}>
        Cancel
      </button>
      <button type="button" onClick={() => alert("Order now")}>
        Order
      </button>
    </div>
  );
};

export default GuestBill;
