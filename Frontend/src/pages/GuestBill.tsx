import React, { useEffect, useState } from "react";
import { Bill } from "../types";
import { getBill } from "../components/GetData";
import DishesList from "../components/DishesList";
import DrinksList from "../components/DrinksList";
import api from "../api";
import { useNavigate } from "react-router-dom";
import "../css/bill.css";

const GuestBill = (props: { setBill: Function }) => {
  const [order, setOrder] = useState<Bill>();
  const [wait, setWait] = useState(false);
  const navigator = useNavigate();

  const fetchOrder = async () => {
    const res = await getBill();
    setOrder(res);
  };

  const abaddonBill = async () => {
    console.log("Order has been abaddon");
    props.setBill(false);
    localStorage.clear();
    setOrder((prev) => {
      return {
        ...prev,
        abandoned: true,
      } as Bill;
    });
    await api
      .put(`app/bill/${order?.id_bill}/`, {
        ...order,
        abandoned: true,
        done: false,
      })
      .then(() => {
        return navigator("/bill/abaddon/");
      })
      .catch((err) => {
        console.log("Can not change the bill " + err);
        throw err;
      });
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  useEffect(() => {
    if (wait === false) fetchOrder();
  }, [wait]);

  const putOutItem = async (type: string, id: number) => {
    const bill = localStorage.getItem("bill");
    return await api
      .delete(`app/bill_${type}/${bill}/${id}/`)
      .catch((err) => console.log("Delete " + err))
      .finally(() => fetchOrder());
  };

  return (
    <>
      <h1>Bill {order?.id_bill}</h1>
      <h2>Dishes</h2>
      <DishesList putOut={putOutItem} mainWait={wait} setWait={setWait} />
      <h2>Drinks</h2>
      <DrinksList putOut={putOutItem} mainWait={wait} setWait={setWait} />
      <h2>
        Full cost <i>{order?.full_cost} zł</i>
      </h2>
      <div className="btn-container">
        <button type="button" onClick={() => abaddonBill()}>
          Cancel
        </button>
        <button type="button" onClick={() => alert("end")}>
          Order
        </button>
      </div>
    </>
  );
};

export default GuestBill;
