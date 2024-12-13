import { Route, Routes } from "react-router-dom";
import Dishes from "./pages/Dishes";
import Drinks from "./pages/Drinks";
import Home from "./pages/Home";
import Bill from "./pages/Bill";
import NotFound from "./pages/NotFound";
import { useEffect, useState } from "react";
import DrinkDetails from "./pages/DrinkDetails";
import Error from "./pages/Error";
import DishDetails from "./pages/DishDetails";
import EndPage from "./pages/EndPage";
import Abaddon from "./pages/Abaddon";

function App() {
  const [haveBill, setHaveBill] = useState(false);

  useEffect(() => {
    const bill = localStorage.getItem("bill");
    bill ? setHaveBill(true) : setHaveBill(false);
  }, []);

  return (
    <div className="main">
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Home />} path="/table/:id/" />
        <Route element={<Dishes />} path="/dishes/" />
        <Route element={<Drinks />} path="/drinks/" />
        <Route element={<Error />} path="/error/" />
        <Route
          element={<Bill haveBill={haveBill} setBill={setHaveBill} />}
          path="/bill/"
        />
        <Route element={<DrinkDetails />} path="/drinks/details/:id/" />
        <Route element={<DishDetails />} path="/dishes/details/:id/" />
        <Route element={<NotFound />} path="*" />
        <Route element={<Abaddon />} path="/bill/abaddon/" />
        <Route element={<EndPage />} path="/bill/done/" />
      </Routes>
    </div>
  );
}

export default App;
