import React, { FormEvent, useEffect, useState } from "react";
import api from "../api";

const EditPop = (props: {
  name: string;
  val: number;
  id_dish?: number;
  id_drink?: number;
  type: string;
  setWait: Function;
  mainWait: boolean;
  refresh: Function;
}) => {
  const [data, setData] = useState({ id_bill: "", number: 0 });

  useEffect(() => {
    const bill = localStorage.getItem("bill");
    setData({ id_bill: bill ?? "", number: props.val });
  }, [props.val]);

  const change = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      props.type === "dish"
        ? await api
            .put(`app/bill_${props.type}/${data.id_bill}/${props.id_dish}/`, {
              id_bill: data.id_bill,
              id_dish: props.id_dish,
              number: data.number,
            })
            .then((res) => res.data)
        : await api
            .put(`app/bill_${props.type}/${data.id_bill}/${props.id_drink}/`, {
              id_bill: data.id_bill,
              id_drink: props.id_drink,
              number: data.number,
            })
            .then((res) => res.data);
    } catch (err) {
      console.log("wrong put  " + err);
      throw err;
    } finally {
      props.setWait(false);
      props.refresh();
    }
  };
  return (
    <form action="/" onSubmit={change} className="edit-popup">
      <h2>{props.name}</h2>
      <input
        type="number"
        name="number"
        min={1}
        value={data.number}
        onChange={(inp) => {
          setData((prev: any) => {
            return { ...prev, number: inp.target.value };
          });
        }}
      />
      <div className="btn-container">
        <button
          type="reset"
          onClick={() => {
            props.setWait(false);
          }}
        >
          Cancel
        </button>
        <button type="submit">Change</button>
      </div>
    </form>
  );
};

export default EditPop;
