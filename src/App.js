import React from "react";
// import TableDoc from "./components/layout/tableDoc";
// import Raport from "react-router-dom";
import Information from "./components/layout/information";
import Login from "./components/layout/login";
import NavBar from "./components/navBar";
import { Switch, Route } from "react-router-dom";
import Raport from "./components/raport";

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
          component={Raport}
          // component={TableDoc}
          // render={(props) => <TableDoc {...props} />}
          render={(props) => <Raport {...props} />}
        />
      </Switch>
    </>
  );
}
// path="/users/:_id?"
// component={UserPage}
// render={(props) => <UserPage {...props} />}
export default App;
