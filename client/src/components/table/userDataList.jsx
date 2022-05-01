import React, { useState } from "react";
import { Link } from "react-router-dom";
import RemoveFormExecutor from "../form/removeFormExecutor";
import { useAuth } from "../hooks/useAuth";

const UserDataList = () => {
    const { currentUser } = useAuth();
    const [stateDispaly, setStateDispaly] = useState("hidden");

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
            <RemoveFormExecutor
                stateDispaly={stateDispaly}
                setStateDispaly={setStateDispaly}
            />
        </>
    );
};

export default UserDataList;
