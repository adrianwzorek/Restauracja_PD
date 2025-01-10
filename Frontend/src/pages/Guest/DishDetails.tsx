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
      <div className="details-container">
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
        <h1>{dish?.title}</h1>
        {dish?.image ? (
          <img
            src={import.meta.env.VITE_BASE_URL + dish?.image}
            alt={dish?.title}
          />
        ) : (
          ""
        )}
        <h4 className={wait ? "disable" : ""}>
          Porcja - {dish?.portion_weight} g
        </h4>
        <div className="wrapper-description">
          <h3 className={wait ? "disable" : ""}>Opis</h3>
          <p className={wait ? "disable" : ""}>{dish?.description}</p>
        </div>
        <div className="wrapper-ingredients">
          <h3 className={wait ? "disable" : ""}>Składniki</h3>
          <p className={wait ? "disable" : ""}>{dish?.ingredients}</p>
        </div>
        <p className={wait ? "disable" : ""}>
          Oferta specjalna - {dish?.special ? "🟢" : "🔴"}
        </p>
        <div className="wrapper-cost">
          <h3 className={wait ? "disable" : ""}>Koszt {dish?.cost} zł</h3>
        </div>
        <ul className="allergen-container">
          <h3 className={wait ? "disable" : ""}>Alergeny</h3>
          {allergen.length > 0 ? (
            allergen.map((e) => {
              return (
                <li key={e.id} className={wait ? "disable" : ""}>
                  {e.name}
                </li>
              );
            })
          ) : (
            <li className={wait ? "disable" : ""}>BRAK</li>
          )}
        </ul>
        <button
          className={wait ? "disable" : ""}
          onClick={() => {
            getAddToBill();
          }}
        >
          Dodaj
        </button>
      </div>
    </>
  );
};

export default DishDetails;
