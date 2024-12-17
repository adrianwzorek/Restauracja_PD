import React, { useEffect, useState } from "react";
import { GetDrink } from "../components/GetData";
import { ALCOHOL, DataDrink } from "../types";
import ChangePage from "../components/ChangePage";
import SpecificButtons from "../components/SpecificButtons";

const Drinks = ({ showPagination }: { showPagination: boolean }) => {
  const [data, setData] = useState<DataDrink>();
  const [url, setUrl] = useState("");
  const [page, setPage] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetDrink(url);
        setData(response);
      } catch (error) {
        alert("Error on fetching: " + error);
      }
    };
    fetchData();
    setPage(url.split("=")[1] ?? "1");
  }, [url]);
  return (
    <>
      {showPagination ?? true ? (
        <>
          <h2>List of Drinks</h2>
          <p>Page {page}</p>
          <ChangePage
            next={data?.movement.prev ?? null}
            prev={data?.movement.next ?? null}
            setUrl={setUrl}
          />
        </>
      ) : (
        ""
      )}
      <ul className="drinks-list">
        {data?.data.map((e, id) => {
          return (
            <li key={id} className="item">
              {e.image ? (
                <img
                  src={`${import.meta.env.VITE_BASE_URL + e.image}`}
                  alt={e.name}
                />
              ) : (
                ""
              )}
              <h3 className="name">{e.name}</h3>
              <p className="cost">{e.cost}zł</p>
              <p className="type">{ALCOHOL(e.type)}</p>
              <p className="description">{e.description}</p>
              <p className="weight">{e.weight}ml</p>
              <SpecificButtons id={e.id} type="drink" name={e.name} />
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Drinks;
