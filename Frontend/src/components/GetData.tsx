import { useEffect, useState } from "react";
import api from "../api";

const GetData = (prop: string) => {
  const [list, setList] = useState();

  useEffect(() => {
    api
      .get(`app/home/${prop}/`)
      .then((response) => {
        setList(response.data);
      })
      .catch((error) => alert(error));
  }, []);
  return list;
};
export default GetData;
