import React, { useEffect, useState } from "react";
import { GetDish, GetDrink } from "../components/GetData";
import { DataDish, DataDrink } from "../types";

const Home = () => {
  const [dish, setDish] = useState<DataDish>();
  const [drink, setDrink] = useState<DataDrink>();

  useEffect(() => {
    try {
      const funDish = async () => {
        const res = await GetDish();
        setDish(res);
      };
      const funDrink = async () => {
        const res = await GetDrink();
        setDrink(res);
      };
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
      <div className="dishes-home">
        <h2>Check out Dishes</h2>
        <div className="dishes-items">
          {dish?.data.map((e, id) => {
            return <li key={id}>{e.title}</li>;
          })}
        </div>
      </div>
      <div className="drinks-home">
        <h2>Check out Drinks</h2>
        <div className="drinks-items">
          {drink?.data.map((e, id) => {
            return <li key={id}>{e.name}</li>;
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
