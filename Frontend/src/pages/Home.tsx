import React, { useEffect, useState } from "react";
import { GetDish, GetDrink } from "../components/GetData";
import { ALCOHOL, DataDish, DataDrink } from "../types";
import { useParams } from "react-router-dom";
import SpecificButtons from "../components/SpecificButtons";

const Home = () => {
  const [dish, setDish] = useState<DataDish>();
  const [drink, setDrink] = useState<DataDrink>();
  const { id } = useParams();

  const funDish = async () => {
    const res = await GetDish();
    setDish(res);
  };
  const funDrink = async () => {
    const res = await GetDrink();
    setDrink(res);
  };

  useEffect(() => {
    try {
      if (id) localStorage.setItem("table", id);
      funDish();
      funDrink();
    } catch (error) {
      console.log(error);
      alert("Bad fetch request" + error);
    }
  }, []);

  return (
    <div className="main">
      <h1>Hello and welcome in my Restoration!</h1>
      <div className="dishes-home-container">
        <h2>Check out Dishes</h2>
        <div className="dishes-items-container">
          {dish?.data.map((e, id) => {
            return id < 3 ? (
              <li key={id} className="card-item">
                <h4>{e.title}</h4>
                <img src={e.image} alt={e.title} />
                <p>{e.portion_weight} g</p>
                <p>{e.cost} zł</p>
                <SpecificButtons id={e.id_dish} type="dish" />
              </li>
            ) : (
              ""
            );
          })}
        </div>
      </div>
      <div className="drinks-home-container">
        <h2>Check out Drinks</h2>
        <div className="drinks-items-container">
          {drink?.data.map((e, id) => {
            return id < 3 ? (
              <li key={id} className="card-item">
                <h4>{e.name}</h4>
                <img src={e.image} alt={e.name} />
                <p>{ALCOHOL(e.type)}</p>
                <p>{e.weight} ml</p>
                <p>{e.cost} zł</p>
                <SpecificButtons id={e.id_drink} type="drink" />
              </li>
            ) : (
              ""
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
