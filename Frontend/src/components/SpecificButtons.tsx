import React from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

const SpecificButtons = (props: { type: string; id: number }) => {
  const navigator = useNavigate();
  const getDetails = async () => {
    try {
      await api
        .get(`/app/home/${props.type}/${props.id}/`)
        .then(() => {
          navigator(`/${props.type}/details/${props.id}`);
        })
        .catch((err) => {
          console.log("Something wrong with get details" + err);
          throw err;
        });
    } catch (err) {
      console.log("Wrong api " + err);
      throw err;
    }
  };

  const addToBill = async (item: number) => {
    const bill = localStorage.getItem("bill");
    if (bill === null) return navigator("/bill");
    props.type === "dish"
      ? await api
          .put(`/app/bill/${bill}/`, { dishes: [item] })
          .then((result) => {
            console.log(result);
            return result;
          })
          .catch((err) => {
            console.log("Wrong query on put an item to the bill dish " + err);
            throw err;
          })
      : await api
          .put(`/app/bill/${bill}/`, { drinks: [item] })
          .then((result) => {
            console.log(result);
            return result;
          })
          .catch((err) => {
            console.log("Wrong query on put an item to the bill drink " + err);
            throw err;
          });
  };
  return (
    <div className="buttons-container">
      <button className="s-btn" onClick={() => getDetails()}>
        Details
      </button>
      <button className="s-btn" onClick={() => addToBill(props.id)}>
        Add
      </button>
    </div>
  );
};

export default SpecificButtons;
