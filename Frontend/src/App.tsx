import GetData from "./components/GetData";
function App() {
  const dish = GetData("dish");
  const drink = GetData("drink");
  console.log(dish, drink);

  return (
    <div>
      Hello world
      <ul></ul>
    </div>
  );
}

export default App;
