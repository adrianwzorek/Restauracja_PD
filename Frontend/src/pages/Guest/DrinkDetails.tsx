import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ALCOHOL, Drink } from "../../types";
import api from "../../api";
import Confirm from "../../components/Confirm";

const DrinkDetails = () => {
  const { id } = useParams();
  const [drink, setDrink] = useState<Drink>();
  const navigator = useNavigate();
  const [wait, setWait] = useState(false);

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

  const getAddToBill = async () => {
    const bill = localStorage.getItem("bill");
    if (!bill) return navigator("/bill/");
    setWait(true);
  };

  return (
    <>
      <div className="details-container">
        {wait ? (
          <Confirm
            id={drink!.id}
            name={drink!.name}
            setWait={setWait}
            type="drink"
          />
        ) : (
          ""
        )}
        <h1 className={wait ? "disable" : ""}>{drink?.name}</h1>
        {drink?.image ? (
          <img
            src={import.meta.env.VITE_BASE_URL + drink?.image}
            alt={drink?.name}
          />
        ) : (
          ""
        )}
        <h3 className={wait ? "disable" : ""}>Porcja - {drink?.weight} ml</h3>
        <div className="wrapper-description">
          <h3 className={wait ? "disable" : ""}>Opis</h3>
          <p className={wait ? "disable" : ""}>{drink?.description}</p>
        </div>
        <h3 className={wait ? "disable" : ""}>{ALCOHOL(drink?.type ?? 2)}</h3>
        <p className={wait ? "disable" : ""}>Koszt - {drink?.cost} zł</p>
        <p className={wait ? "disable" : ""}>
          Special {drink?.special ? "🟢" : "🔴"}
        </p>
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

export default DrinkDetails;
