import React, { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import { BillDish, BillDrink } from "../types";

const Confirm = (props: {
  type: string;
  id: number;
  setWait: Function;
  name: string;
}) => {
  const [data, setData] = useState<BillDish | BillDrink>();
  const { url } = useParams();
  useEffect(() => {
    const bill = Number(localStorage.getItem("bill"));
    props.type === "dish"
      ? setData({ id_bill: bill, number: 1 })
      : setData({ id_bill: bill, number: 1 });
  }, []);

  const addToBill = async (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    console.log(data);
    try {
      if (props.type === "dish") {
        api
          .post(`app/bill_${props.type}/`, {
            id_dish: props.id,
            id_bill: data?.id_bill,
            number: data?.number,
          })
          .catch((err) => {
            console.log("something in post dish " + err);
          });
        alert("added dish");
      } else {
        api
          .post(`app/bill_${props.type}/`, {
            id_drink: props.id,
            id_bill: data?.id_bill,
            number: data?.number,
          })
          .catch((err) => {
            console.log("something in post drink " + err);
          });
        alert("added drink");
      }
    } catch (err) {
      console.log("wrong query " + err);
      throw err;
    }
    props.setWait(false);
  };
  return (
    <form action={url} className="popup" onSubmit={addToBill}>
      <h1>Confirm</h1>
      <h2>{props?.name}</h2>
      <label htmlFor="number">
        <input
          type="number"
          name="number"
          id="number"
          min={1}
          value={data?.number ?? ""}
          onChange={(e) =>
            setData((prev: any) => {
              return { ...prev, number: e.target.value };
            })
          }
        />
      </label>

      <div className="buttons-container">
        <button type="reset" onClick={() => props.setWait(false)}>
          Cancel
        </button>
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

export default Confirm;
