import React, { useEffect, useState } from "react";
import { BillDish, Dish } from "../types";
import { getGuestDish, numberOfDish } from "./GetData";
import EditPop from "./EditPop";

const DishesList = (props: {
  putOut: Function;
  mainWait: boolean;
  setWait: Function;
}) => {
  const [dish, setDish] = useState<Dish[]>();
  const [billDish, setBillDish] = useState<BillDish[]>();
  const [local, setLocal] = useState(false);
  const fetchDishes = async () => {
    const bdish = await numberOfDish();
    setBillDish(bdish);
    const resDish = await getGuestDish(bdish);
    setDish(resDish);
  };

  useEffect(() => {
    fetchDishes();
  }, []);

  useEffect(() => {
    fetchDishes();
  }, [props.mainWait, props.putOut]);

  const edit = () => {
    setLocal(true);
    props.setWait(true);
  };

  return (
    <>
      <ul className="dish-container">
        {dish?.map((e, id) => {
          return (
            <li key={id} className="dish-item">
              {props.mainWait && local ? (
                <EditPop
                  name={e.title}
                  setWait={props.setWait}
                  mainWait={props.mainWait}
                  val={billDish![id].number}
                  type="dish"
                  id_dish={e.id}
                  refresh={fetchDishes}
                />
              ) : (
                ""
              )}
              {e.image ? <img src={e.image} alt={e.title} /> : ""}
              <h2>
                {e.title} x{billDish![id].number}
              </h2>
              <h3>one - {e.cost} zł</h3>
              <p>full cost - {e.cost * billDish![id].number}zł</p>
              <div className="buttons-container">
                <button onClick={() => edit()}>Edit</button>
                <button onClick={() => props.putOut("dish", e.id)}>
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default DishesList;
