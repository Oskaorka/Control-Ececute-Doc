import React from "react";
import Information from "./components/layout/information";
import Login from "./components/layout/login";
import NavBar from "./components/navBar";
import { Switch, Route } from "react-router-dom";
import RaportList from "./components/layout/raportList";
import { DocDataProvider } from "./components/hooks/useDocData";
import { ExecutorProvider } from "./components/hooks/useExecutor";
import AuthProvider from "./components/hooks/useAuth";
import AddDataProvider from "./components/hooks/useAddDocData";
import AdminPanel from "./components/adminPanel";
import "./App.scss";
import LogOut from "./components/layout/logOut";
import UserDataList from "./components/table/userDataList";
import CreateNewDataTable from "./components/createNewDataTable";
function App() {
    return (
        <>
            <DocDataProvider>
                <AuthProvider>
                    <AddDataProvider>
                        <NavBar />
                        <ExecutorProvider>
                            <Switch>
                                <Route
                                    path="/information"
                                    component={Information}
                                />
                                <Route
                                    path="/AdminPanel/:type?"
                                    component={AdminPanel}
                                />
                                <Route path="/logout" component={LogOut} />
                                <Route
                                    path="/userlist"
                                    component={UserDataList}
                                />
                                <Route
                                    path="/createNewDataTable"
                                    component={CreateNewDataTable}
                                />
                                <Route path="/login/:type?" component={Login} />
                                <Route
                                    exact
                                    path="/:_id?"
                                    component={RaportList}
                                />
                            </Switch>
                        </ExecutorProvider>
                    </AddDataProvider>
                </AuthProvider>
            </DocDataProvider>
        </>
    );
}
export default App;
