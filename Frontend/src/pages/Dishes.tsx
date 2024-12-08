import React, { useEffect, useState } from "react";
import { GetDish } from "../components/GetData";
import ChangePage from "../components/ChangePage";
import { DataDish } from "../types";
import SpecificButtons from "../components/SpecificButtons";
const Dishes = () => {
  const [data, setData] = useState<DataDish>();
  const [url, setUrl] = useState("");
  const [page, setPage] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetDish(url);
        setData(response);
      } catch (error) {
        alert("Error on fetching: " + error);
      }
    };
    fetchData();
    setPage(url.split("=")[1] ?? "1");
  }, [url]);
  return (
    <ul>
      <h2>List of Dishes</h2>
      <p>Page {page}</p>
      <ChangePage
        next={data?.movement.next ?? null}
        prev={data?.movement.prev ?? null}
        setUrl={setUrl}
      />
      {data?.data.map((e, id) => {
        return (
          <li key={id}>
            <h3 className="title">{e.title}</h3>
            <img
              src={`${import.meta.env.VITE_BASE_URL + e.image}`}
              alt={e.title}
            />
            <p className="cost">{e.cost}zł</p>
            <p className="description">{e.description}</p>
            <p className="weight">{e.portion_weight}g</p>
            <SpecificButtons id={e.id_dish} type="dish" />
          </li>
        );
      })}
    </ul>
  );
};

export default Dishes;
