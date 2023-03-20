import "./App.css";
import { Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home/Home";
import Description from "./components/Description/Description";
import Form from "./components/Form/Form";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/videogames" component={Home} />
        <Route exact path="/videogames/:id" component={Description} />
        <Route exact path="/form" component={Form} />
      </Switch>
    </div>
  );
}

export default App;
