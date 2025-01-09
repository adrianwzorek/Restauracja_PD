import React, { useEffect, useState } from "react";
import { GetDish } from "../../components/GetData";
import ChangePage from "../../components/ChangePage";
import { DataDish } from "../../types";
import SpecificButtons from "../../components/SpecificButtons";
import "../../css/lists.css";

const Dishes = ({ showPagination }: { showPagination: boolean }) => {
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
    <>
      {showPagination ? (
        <>
          <h2>Nasze Dania</h2>
          <ChangePage
            next={data?.movement.next ?? null}
            prev={data?.movement.prev ?? null}
            page={page}
            setUrl={setUrl}
          />
        </>
      ) : (
        ""
      )}
      <ul className="dishes-list">
        {data?.data.map((e, id) => {
          return (
            <li key={id} className="item">
              {e.image ? (
                <img
                  src={`${import.meta.env.VITE_BASE_URL + e.image}`}
                  alt={e.title}
                />
              ) : (
                ""
              )}
              <h3 className="title">{e.title}</h3>
              <p className="weight"> Porcja - {e.portion_weight}g</p>
              <p className="cost">Koszt - {e.cost}zł</p>
              <SpecificButtons id={e.id} type="dish" name={e.title} />
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Dishes;
