import React, { useState } from "react";
import CreateNewDataTable from "./createNewDataTable";
import FormRegisterUser from "./formRegisterUser";
import { useParams } from "react-router-dom";

const AdminPanel = () => {
    const { type } = useParams();
    const [formType, setFormType] = useState(
        type === "addData" ? type : "addUser"
    );
    const toggleFormType = () => {
        setFormType((prevState) =>
            prevState === "addData" ? "addUser" : "addData"
        );
    };
    return (
        <div className="d-flex flex-column align-items-center">
            <h1 className="mb-4">Панель администратора</h1>
            {formType === "addData" ? (
                <>
                    <p>
                        <a role="button" onClick={toggleFormType}>
                            добавить пользователя
                        </a>
                    </p>
                    <CreateNewDataTable />
                </>
            ) : (
                <>
                    <p>
                        <a role="button" onClick={toggleFormType}>
                            добавить новую задачу
                        </a>
                    </p>
                    <FormRegisterUser />
                </>
            )}
        </div>
    );
};

export default AdminPanel;
