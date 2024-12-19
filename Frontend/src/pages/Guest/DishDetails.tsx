import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Allergen, Dish } from "../../types";
import api from "../../api";
import { getAllergen } from "../../components/GetData";
import "../../css/details.css";
import Confirm from "../../components/Confirm";

const DishDetails = () => {
  const { id } = useParams();
  const [dish, setDish] = useState<Dish>();
  const [allergen, setAllergen] = useState<Allergen[]>([]);
  const navigator = useNavigate();
  const [wait, setWait] = useState(false);

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

  const getAddToBill = async () => {
    const bill = localStorage.getItem("bill");
    if (!bill) return navigator("/bill/");
    setWait(true);
  };

  useEffect(() => {
    fetchDrink();
  }, []);

  return (
    <>
      {wait ? (
        <Confirm
          id={dish!.id}
          name={dish!.title}
          setWait={setWait}
          type="dish"
        />
      ) : (
        ""
      )}
      <div className="details-container">
        <h1>{dish?.title}</h1>
        {dish?.image ? (
          <img
            src={import.meta.env.VITE_BASE_URL + dish?.image}
            alt={dish?.title}
          />
        ) : (
          ""
        )}
        <h3>Portion weight {dish?.portion_weight} g</h3>
        <p>{dish?.description}</p>
        <p>{dish?.ingredients}</p>
        <p>Special - {dish?.special ? "🟢" : "🔴"}</p>
        <p>{dish?.cost} zł</p>
        <p>weight - {dish?.portion_weight}g</p>
        <ul className="allergen-container">
          <h3>Allergens</h3>
          {allergen.length > 0 ? (
            allergen.map((e) => {
              return <li key={e.id}>{e.name}</li>;
            })
          ) : (
            <li>BRAK</li>
          )}
        </ul>
        <button
          onClick={() => {
            getAddToBill();
          }}
        >
          Add
        </button>
      </div>
    </>
  );
};

export default DishDetails;
