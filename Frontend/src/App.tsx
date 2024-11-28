import { Route, Routes } from "react-router-dom";
import Dishes from "./pages/Dishes";
import Drinks from "./pages/Drinks";
import Home from "./pages/Home";
import Bill from "./pages/Bill";
import NotFound from "./pages/NotFound";
function App() {
  return (
    <Routes>
      <Route Component={Home} path="/" />
      <Route Component={Dishes} path="/dishes/" />
      <Route Component={Drinks} path="/drinks/" />
      <Route Component={Bill} path="/login/" />
      <Route Component={NotFound} path="*" />
    </Routes>
  );
}

export default App;
