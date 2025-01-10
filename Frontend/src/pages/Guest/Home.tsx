import React, { useEffect, useState } from "react";
import { GetDish, GetDrink } from "../../components/GetData";
import { DataDish, DataDrink } from "../../types";
import { useParams } from "react-router-dom";
import Dishes from "./Dishes";
import Drinks from "./Drinks";

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
    <>
      <h1>Witamy w naszej restauracji</h1>
      <div className="dishes-home-container">
        <h2>Dania najwyżej ocenianie</h2>
        <Dishes showPagination={false} />
      </div>
      <div className="drinks-home-container">
        <h2>Napoje warte uwagi</h2>
        <Drinks showPagination={false} />
      </div>
    </>
  );
};

export default Home;
