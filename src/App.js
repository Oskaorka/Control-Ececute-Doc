import React, { useState } from "react";
import Information from "./components/layout/information";
import Login from "./components/layout/login";
import NavBar from "./components/navBar";
import { Switch, Route } from "react-router-dom";
import RaportList from "./components/layout/raportList";
import CreateNewDataTable from "./components/createNewDataTable";

function App() {
  const [bool, setBool] = useState(false);
  const toggleBool = (getBool) => {
    return setBool(getBool);
  };
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/information" component={Information} />
        <Route path="/createNewDataTable" component={CreateNewDataTable} />
        <Route
          path="/login/:adminPage?"
          render={(props) => (
            <Login isAdmin={bool} toggleBool={toggleBool} {...props} />
          )}
        />
        <Route
          exact
          path="/:id?"
          render={(props) => <RaportList isAdmin={bool} {...props} />}
        />
      </Switch>
    </>
  );
}
export default App;
