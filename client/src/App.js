import React, { useEffect } from "react";
import Information from "./components/layout/information";
import Login from "./components/layout/login";
import NavBar from "./components/navBar";
import { Switch, Route } from "react-router-dom";
import RaportList from "./components/layout/raportList";
import AuthProvider from "./components/hooks/useAuth";
// import AddDataProvider from "./components/hooks/useAddDocData";
import AdminPanel from "./components/adminPanel";
import "./App.scss";
import LogOut from "./components/layout/logOut";
import UserDataList from "./components/table/userDataList";
import CreateNewDataTable from "./components/createNewDataTable";
import { loadDocDataList } from "./components/store/docData";
import { useDispatch } from "react-redux";
import { loadExecutorList } from "./components/store/executor";
import ExecutorsLoader from "./components/layout/ui/hoc/executorsLoader";
import DocDataLoader from "./components/layout/ui/hoc/docDataLoader";
import { loadAdminList } from "./components/store/admin";
// import AdminsLoader from "./components/layout/ui/hoc/adminLoader";
function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadDocDataList());
        dispatch(loadExecutorList());
        dispatch(loadAdminList());
    }, []);

    return (
        <>
            <DocDataLoader>
                <ExecutorsLoader>
                    {/* <AdminsLoader> */}
                    <AuthProvider>
                        {/* <AddDataProvider> */}
                            <NavBar />
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
                                    // eslint-disable-next-line react/no-children-prop
                                    children={ <CreateNewDataTable/> }
                                />
                                <Route path="/login/:type?" component={Login} />
                                <Route
                                    exact
                                    path="/:_id?"
                                    component={RaportList}
                                />
                            </Switch>
                        {/* </AddDataProvider> */}
                    </AuthProvider>
                    {/* </AdminsLoader> */}
                </ExecutorsLoader>
            </DocDataLoader>
        </>
    );
}
export default App;
