import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Allergen, Dish } from "../types";
import api from "../api";
import { addToBill } from "../components/SetData";
import { getAllergen } from "../components/GetData";

const DishDetails = () => {
  const { id } = useParams();
  const [dish, setDish] = useState<Dish>();
  const [allergen, setAllergen] = useState<Allergen[]>([]);
  const navigator = useNavigate();

  const fetchDrink = async () => {
    try {
      const res = await api
        .get(`/app/home/dish/${id}/`)
        .then((response) => {
          return response.data as Dish;
        })
        .catch((err) => {
          console.log("Something wrong with get dish " + err);
          navigator("/error/");
          throw err;
        });
      const listAllergen = await getAllergen(res.has_allergen);
      setDish(res);
      setAllergen(listAllergen);
    } catch (err) {
      console.log("Wrong with url " + err);
    }
  };

  useEffect(() => {
    fetchDrink();
  }, []);

  //! Console log the result
  console.log(allergen);

  return (
    <div className="details-container">
      <h1>{dish?.title}</h1>
      <img src={dish?.image} alt={dish?.title} />
      <p>{dish?.description}</p>
      <p>{dish?.ingredients}</p>
      <h3>Portion weight {dish?.portion_weight} g</h3>
      <p>{dish?.cost} zł</p>
      <ul className="allergen-container">
        <h3>Allergens</h3>
        {allergen.map((e) => {
          return <li key={e.id_allergen}>{e.name}</li>;
        })}
      </ul>
      <button
        onClick={() => {
          addToBill("dish", dish?.id_dish!);
        }}
      >
        Add
      </button>
    </div>
  );
};

export default DishDetails;
