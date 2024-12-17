import React, { useEffect, useState } from "react";
import { GetDish, GetDrink } from "../components/GetData";
import { ALCOHOL, DataDish, DataDrink } from "../types";
import { useParams } from "react-router-dom";
import SpecificButtons from "../components/SpecificButtons";
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
      <h1>Hello and welcome in my Restoration!</h1>
      <div className="dishes-home-container">
        <h2>Check out Dishes</h2>
        <div className="dishes-items-container">
          <Dishes showPagination={false} />
        </div>
      </div>
      <div className="drinks-home-container">
        <h2>Check out Drinks</h2>
        <div className="drinks-items-container">
          <Drinks showPagination={false} />
        </div>
      </div>
    </>
  );
};

export default Home;
