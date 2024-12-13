import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ALCOHOL, Drink } from "../types";
import api from "../api";
import { addToBill } from "../components/SetData";

const DrinkDetails = () => {
  const { id } = useParams();
  const [drink, setDrink] = useState<Drink>();
  const navigator = useNavigate();
  useEffect(() => {
    const fetchDrink = async () => {
      try {
        return api
          .get(`/app/home/drink/${id}/`)
          .then((response) => {
            setDrink(response.data);
          })
          .catch((err) => {
            console.log("Something wrong with get drink " + err);
            navigator("/error/");
            throw err;
          });
      } catch (err) {
        console.log("Wrong with url " + err);
      }
    };
    fetchDrink();
  }, []);

  // ! Console log
  console.log(drink);

  const getAddToBill = async () => {
    const res = await addToBill("drink", drink?.id!);
    if (res) return navigator(res);
  };
  return (
    <div className="details-container">
      <h1>{drink?.name}</h1>
      <img src={drink?.image} alt={drink?.name} />
      <h2>{drink?.description}</h2>
      <p>{ALCOHOL(drink?.type ?? 0)}</p>
      <p>{drink?.cost} zł</p>
      <p>Special {drink?.special ? "🟢" : "🔴"}</p>
      <button
        onClick={() => {
          getAddToBill();
        }}
      >
        Add
      </button>
    </div>
  );
};

export default DrinkDetails;
