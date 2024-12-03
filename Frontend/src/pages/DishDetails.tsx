import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Dish } from "../types";
import api from "../api";

const DishDetails = () => {
  const { id } = useParams();
  const [dish, setDish] = useState<Dish>();
  const navigator = useNavigate();
  useEffect(() => {
    const fetchDrink = async () => {
      try {
        return api
          .get(`/app/home/dish/${id}/`)
          .then((response) => {
            setDish(response.data);
          })
          .catch((err) => {
            console.log("Something wrong with get dish " + err);
            navigator("/error/");
            throw err;
          });
      } catch (err) {
        console.log("Wrong with url " + err);
      }
    };
    fetchDrink();
  }, []);

  //! Console log the result
  console.log(dish);

  return (
    <div className="details-container">
      <h1>{dish?.title}</h1>
      <p>{dish?.description}</p>
      <p>{dish?.ingredients}</p>
      <h3>{dish?.portion_weight}</h3>
      <p>{dish?.cost}zł</p>
      <p>{dish?.has_allergen}</p>
      <button
        onClick={() => {
          alert("Adding view");
        }}
      >
        Add
      </button>
    </div>
  );
};

export default DishDetails;
