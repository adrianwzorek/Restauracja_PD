import GetData from "./components/GetData";
function App() {
  const dish = GetData("dish");
  const drink = GetData("drink");
  const oneDrink = GetData("drink/1");
  const oneDish = GetData("dish/1");
  console.log(dish, drink, oneDrink, oneDish);

  return (
    <div>
      Hello world
      <ul></ul>
    </div>
  );
}

export default App;
