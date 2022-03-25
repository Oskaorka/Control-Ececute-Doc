import React from "react";
import TableDoc from "../table/tableDoc";
import { useParams } from "react-router-dom";
import RaportData from "../table/raportData";
import { useDocData } from "../hooks/useDocData";
import { useExecutor } from "../hooks/useExecutor";

const RaportList = () => {
    const { docData, isLoading } = useDocData();

    const { executor } = useExecutor();
    const params = useParams();
    const { _id } = params;
    const findeData = (id) => {
        return docData.find((user) => String(user._id) === id);
    };
    const user = findeData(_id);

    return user !== undefined ? (
        <RaportData data={user} executor={executor} />
    ) : isLoading ? (
        <TableDoc docData={docData} executor={executor} />
    ) : (
        <h1 className="d-flex justify-content-center mt-4">
            Загрузка данных...
        </h1>
    );
};
export default RaportList;
