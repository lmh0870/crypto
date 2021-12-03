import { BrowserRouter, Switch, Route } from "react-router-dom";
import Coin from "./Coin";
import Home from "./Home";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:coinId">
          <Coin />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
export default Router;
