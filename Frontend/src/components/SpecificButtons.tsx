import React from "react";
import { addToBill } from "./SetData";
import { getDetailsDish, getDetailsDrink } from "./GetData";
import { useNavigate } from "react-router-dom";

const SpecificButtons = (props: { type: string; id: number }) => {
  const navigator = useNavigate();

  const goToDetails = async () => {
    if (props.type === "dish") {
      const item = await getDetailsDish(props.id);
      return navigator(`/${props.type}es/details/${item.id_dish}`);
    } else {
      const item = await getDetailsDrink(props.id);
      return navigator(`/${props.type}s/details/${item.id_drink}/`);
    }
  };

  const addItem = async () => {
    const bill = localStorage.getItem("bill");
    if (!bill) return navigator("/bill/");
    const result = await addToBill(props.type, props.id);
    return result;
  };

  return (
    <div className="buttons-container">
      <button className="s-btn" onClick={() => goToDetails()}>
        Details
      </button>
      <button className="s-btn" onClick={() => addItem()}>
        Add
      </button>
    </div>
  );
};

export default SpecificButtons;
