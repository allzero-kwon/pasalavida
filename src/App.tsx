import { useRoutes } from "react-router-dom";
import "./App.css";
import { routes } from "routes";

function App() {
  const element = useRoutes(routes);
  return element;
}

export default App;
