import React, { useState } from "react";
import { getDetailsDish, getDetailsDrink } from "./GetData";
import { useNavigate } from "react-router-dom";
import Confirm from "./Confirm";

const SpecificButtons = (props: { type: string; id: number; name: string }) => {
  const navigator = useNavigate();
  const [wait, setWait] = useState(false);

  const goToDetails = async () => {
    if (props.type === "dish") {
      const item = await getDetailsDish(props.id);
      return navigator(`/${props.type}es/details/${item.id}`);
    } else {
      const item = await getDetailsDrink(props.id);
      return navigator(`/${props.type}s/details/${item.id}/`);
    }
  };

  const openPop = () => {
    const bill = localStorage.getItem("bill");
    if (!bill) return navigator("/bill/");
    setWait(true);
  };

  return (
    <>
      {wait ? (
        <Confirm
          id={props.id}
          type={props.type}
          setWait={setWait}
          name={props.name}
        />
      ) : (
        ""
      )}
      <div className="btn-container">
        <button className="s-btn" onClick={() => goToDetails()}>
          Details
        </button>
        <button className="s-btn" onClick={() => openPop()}>
          Add
        </button>
      </div>
    </>
  );
};

export default SpecificButtons;
