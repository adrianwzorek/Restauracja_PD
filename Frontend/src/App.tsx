import { useEffect, useState } from "react";
import api from "./api";

function App() {
  const [dish, setDish] = useState();
  useEffect(() => {
    api
      .get("app/home/4/")
      .then((response) => {
        setDish(response.data.dishes);
        return response;
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(dish);
  const list = dish.map((e, id) => {
    return <li key={id}>{e}</li>;
  });
  return (
    <div>
      Hello world
      <ul>{list}</ul>
    </div>
  );
}

export default App;
