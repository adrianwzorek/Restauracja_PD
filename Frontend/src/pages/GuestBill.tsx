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
    await api
      .put(`app/bill/${order!.id}/`, {
        ...order,
        abandoned: true,
      })
      .then(() => {
        return navigator("/bill/abaddon/");
      })
      .catch((err) => {
        console.log("Can not change the bill " + err);
        throw err;
      });
    props.setBill(false);
    localStorage.clear();
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

  const orderNow = async () => {
    const guest = localStorage.getItem("guest");
    if (!guest) return alert("Please contact our staff");
    await api
      .put(`app/guest/${guest}/`, { wait: true })
      .catch((err) => alert("wrong query " + err));
    return navigator("/bill/done/");
  };

  return (
    <>
      <h1>Bill {order?.id}</h1>
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
        <button type="button" onClick={() => orderNow()}>
          Order
        </button>
      </div>
    </>
  );
};

export default GuestBill;
