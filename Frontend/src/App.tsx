import { Route, Routes } from "react-router-dom";
import Dishes from "./pages/Guest/Dishes";
import Drinks from "./pages/Guest/Drinks";
import Home from "./pages/Guest/Home";
import Bill from "./pages/Guest/Bill";
import NotFound from "./pages/NotFound";
import { useEffect, useState } from "react";
import DrinkDetails from "./pages/Guest/DrinkDetails";
import Error from "./pages/Error";
import DishDetails from "./pages/Guest/DishDetails";
import EndPage from "./pages/Guest/EndPage";
import Abaddon from "./pages/Guest/Abaddon";
import Login from "./pages/Login";
import Dashboard from "./pages/Waiter/Dashboard";
import Protect from "./components/Protect";

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
        <Route element={<Dishes showPagination={true} />} path="/dishes/" />
        <Route element={<Drinks showPagination={true} />} path="/drinks/" />
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
        <Route element={<Login />} path="/login" />
        <Route
          element={
            <Protect>
              <Dashboard />
            </Protect>
          }
          path="/dashboard"
        />
      </Routes>
    </div>
  );
}

export default App;
