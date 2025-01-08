import React, { useEffect, useState } from "react";
import { BillDrink, Drink } from "../types";
import { getGuestDrink, numberOfDrink } from "./GetData";
import EditPop from "./EditPop";

const DrinksList = (props: {
  putOut: Function;
  mainWait: boolean;
  setWait: Function;
}) => {
  const [drink, setDrink] = useState<Drink[]>();
  const [billDrink, setBillDrink] = useState<BillDrink[]>();
  const [local, setLocal] = useState(false);
  const fetchDrink = async () => {
    const bdrink = await numberOfDrink();
    setBillDrink(bdrink);
    const drink = await getGuestDrink(bdrink);
    setDrink(drink);
  };

  useEffect(() => {
    fetchDrink();
  }, []);

  useEffect(() => {
    fetchDrink();
  }, [props.mainWait]);

  const deleteItem = (id: number) => {
    const list = drink?.filter((e) => e.id !== id);
    setDrink(list);
    props.putOut("drink", id);
  };

  const edit = () => {
    setLocal(true);
    props.setWait(true);
  };

  return (
    <>
      <ul className="drink-container">
        {drink?.map((e, id) => {
          return (
            <li key={id} className="drink-item">
              {props.mainWait && local ? (
                <EditPop
                  name={e.name}
                  mainWait={props.mainWait}
                  setWait={props.setWait}
                  val={billDrink![id].number}
                  type="drink"
                  id_drink={e.id}
                  refresh={fetchDrink}
                />
              ) : (
                ""
              )}
              {e.image ? (
                <img
                  src={import.meta.env.VITE_BASE_URL + e.image}
                  alt={e.name}
                />
              ) : (
                ""
              )}
              <h3 className={props.mainWait ? "disable" : ""}>
                {e.name} x{billDrink![id].number}
              </h3>
              <h4 className={props.mainWait ? "disable" : ""}>
                full cost - {e.cost * billDrink![id].number}zł
              </h4>
              <p className={props.mainWait ? "disable" : ""}>
                One - {e.cost} zł
              </p>
              <div className="btn-container">
                <button onClick={() => edit()} disabled={props.mainWait}>
                  Edit
                </button>
                <button
                  onClick={() => deleteItem(e.id)}
                  disabled={props.mainWait}
                >
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

export default DrinksList;
