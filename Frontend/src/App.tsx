import { Route, Routes } from "react-router-dom";
import Dishes from "./pages/Dishes";
import Drinks from "./pages/Drinks";
import Home from "./pages/Home";
import Bill from "./pages/Bill";
import NotFound from "./pages/NotFound";
// import Protected from "./components/Protected";
import { useState } from "react";
function App() {
  const [haveBill, setHaveBill] = useState(false);
  return (
    <Routes>
      <Route Component={Home} path="/" />
      <Route Component={Home} path="/table/:id/" />
      <Route Component={Dishes} path="/dishes/" />
      <Route Component={Drinks} path="/drinks/" />
      <Route
        element={<Bill haveBill={haveBill} setBill={setHaveBill} />}
        path="/bill/"
      />
      <Route Component={NotFound} path="*" />
      {/* <Route element={<Protected></Protected>} path="/guestBill/" /> */}
    </Routes>
  );
}

export default App;
