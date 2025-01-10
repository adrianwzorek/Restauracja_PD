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
<<<<<<< HEAD
    <ul className="drinks-container">
      {props.dishes?.map((e) => {
        return (
          <li key={e.id_dish} className="drink-item">
            <p>{e.title}</p>
            <img src={`${e.image}`} alt={e.title} />
            <p>{e.cost} zł</p>
            <button onClick={() => props.putOut(e.id_dish, "dish")}>
              Delete
            </button>
          </li>
        );
      })}
    </ul>
=======
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
              <h3 className={props.mainWait ? "disable" : ""}>
                {e.title} x{billDish![id].number}
              </h3>
              <h4 className={props.mainWait ? "disable" : ""}>
                Koszt - {e.cost * billDish![id].number}zł
              </h4>
              <p className={props.mainWait ? "disable" : ""}>
                Jedno - {e.cost} zł
              </p>
              <div className="btn-container">
                <button onClick={() => edit()} disabled={props.mainWait}>
                  Edytuj
                </button>
                <button
                  onClick={() => deleteItem(e.id)}
                  disabled={props.mainWait}
                >
                  Usuń
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </>
>>>>>>> Version_5_style
  );
};

export default DishesList;
