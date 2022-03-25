import React, { useState } from "react";
import { Link } from "react-router-dom";
import RemoveFormExecutor from "../form/removeFormExecutor";
import { useAuth } from "../hooks/useAuth";
// import { useDocData } from "../hooks/useDocData";
// import { useExecutor } from "../hooks/useExecutor";
// import TableBody from "./tableBody";
// import TableHeader from "./tableHeader";

const UserDataList = () => {
    const { currentUser } = useAuth();
    // const { executor } = useExecutor();
    // const { docData } = useDocData();

    const [stateDispaly, setStateDispaly] = useState("hidden");
    // const [selectData, setSelectData] = useState();

    // const removeExecutor = (e) => {
    //     setStateDispaly("show");
    //     setSelectData(e);
    // };

    return (
        <>
            {currentUser && currentUser.type === "admin" ? (
                <div className=" d-flex justify-content-center  mb-4">
                    <Link className="btn btn-secondary mx-4 " to="/AdminPanel">
                        добавить пользователя
                    </Link>
                    <Link
                        className="btn btn-secondary mx-4"
                        to="/createNewDataTable"
                        role="button"
                    >
                        Внести в контроль
                    </Link>
                </div>
            ) : null}
            {/* <table>
                <TableHeader />
                <TableBody
                    data={docData}
                    executor={executor}
                    removeExecutor={removeExecutor}
                />
            </table> */}
            <RemoveFormExecutor
                stateDispaly={stateDispaly}
                setStateDispaly={setStateDispaly}
                // selectData={selectData}
            />

            {/* {currentUser && currentUser.type === "admin" && (

            )} */}
        </>
    );
};

export default UserDataList;
