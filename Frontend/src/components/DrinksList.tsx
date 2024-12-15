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
  }, [props.mainWait, props.putOut]);

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
              {e.image ? <img src={e.image} alt={e.name} /> : ""}
              <h2>
                {e.name} x {billDrink![id].number}
              </h2>
              <h3>One - {e.cost} zł</h3>
              <p>full cost - {e.cost * billDrink![id].number}zł</p>
              <div className="buttons-container">
                <button onClick={() => edit()}>Edit</button>
                <button onClick={() => props.putOut("drink", e.id)}>
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
