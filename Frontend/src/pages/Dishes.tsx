import React, { useEffect, useState } from "react";
import { GetDish } from "../components/GetData";
import ChangePage from "../components/ChangePage";
import { DataDish } from "../types";
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
      <p>{page}</p>
      <ChangePage
        next={data?.movement.next ?? null}
        prev={data?.movement.prev ?? null}
        setUrl={setUrl}
      />
      {data?.data.map((e, id) => {
        return (
          <li key={id}>
            <h3 className="title">{e.title}</h3>
            <p className="cost">{e.cost}zł</p>
            <p className="description">{e.description}</p>
            <div className="allergens">
              {e.has_allergen.map((e1, id2) => {
                return <p key={id2}>{e1}</p>;
              })}
            </div>
            <p className="weight">{e.portion_weight}g</p>
          </li>
        );
      })}
    </ul>
  );
};

export default Dishes;
