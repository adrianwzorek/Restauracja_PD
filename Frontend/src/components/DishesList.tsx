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
  }, [props.mainWait]);

  const deleteItem = (id: number) => {
    const list = dish?.filter((e) => e.id !== id);
    setDish(list);
    props.putOut("dish", id);
  };

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
              {e.image ? (
                <img
                  src={import.meta.env.VITE_BASE_URL + e.image}
                  alt={e.title}
                />
              ) : (
                ""
              )}
              <h3>
                {e.title} x{billDish![id].number}
              </h3>
              <h4>full cost - {e.cost * billDish![id].number}zł</h4>
              <p>one - {e.cost} zł</p>
              <div className="buttons-container">
                <button onClick={() => edit()}>Edit</button>
                <button onClick={() => deleteItem(e.id)}>Delete</button>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default DishesList;
