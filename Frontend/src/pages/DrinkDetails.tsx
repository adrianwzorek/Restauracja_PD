import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ALCOHOL, Drink } from "../types";
import api from "../api";

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

  return (
    <div className="details-container">
      <h1>{drink?.name}</h1>
      <h2>{drink?.description}</h2>
      <p>{ALCOHOL(drink?.type ?? 0)}</p>
      <p>{drink?.cost}</p>
      <p>{drink?.special ? "🟢" : "🔴"}</p>
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

export default DrinkDetails;
