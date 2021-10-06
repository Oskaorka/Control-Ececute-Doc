import React from "react";
import Information from "./components/layout/information";
import Login from "./components/layout/login";
import NavBar from "./components/navBar";
import { Switch, Route } from "react-router-dom";
import RaportList from "./components/layout/raportList";

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/information" component={Information} />
        <Route path="/login" component={Login} />
        <Route
          exact
          path="/:id?"
          component={RaportList}
          render={(props) => <RaportList {...props} />}
        />
      </Switch>
    </>
  );
}
export default App;
