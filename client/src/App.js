import React from "react";
import Information from "./components/layout/information";
import Login from "./components/layout/login";
import NavBar from "./components/navBar";
import { Switch, Route } from "react-router-dom";
import RaportList from "./components/layout/raportList";
import CreateNewDataTable from "./components/createNewDataTable";
import { DocDataProvider } from "./components/hooks/useDocData";
import { ExecutorProvider } from "./components/hooks/useExecutor";
import AuthProvider from "./components/hooks/useAuth";
import AddDataProvider from "./components/hooks/useAddDocData";
function App() {
    return (
        <>
            <AddDataProvider>
                <AuthProvider>
                    <NavBar />
                    <DocDataProvider>
                        <ExecutorProvider>
                            <Switch>
                                <Route
                                    path="/information"
                                    component={Information}
                                />
                                <Route
                                    path="/createNewDataTable"
                                    component={CreateNewDataTable}
                                />
                                <Route
                                    path="/login/:adminPage?"
                                    component={Login}
                                />
                                <Route
                                    exact
                                    path="/:id?"
                                    component={RaportList}
                                />
                            </Switch>
                        </ExecutorProvider>
                    </DocDataProvider>
                </AuthProvider>
            </AddDataProvider>
        </>
    );
}
export default App;
