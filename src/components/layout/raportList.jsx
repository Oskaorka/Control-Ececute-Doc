import React from "react";
import TableDoc from "../table/tableDoc";
import { useParams } from "react-router-dom";
import RaportData from "../table/raportData";
import { useDocData } from "../hooks/useDocData";
import { useExecutor } from "../hooks/useExecutor";
const RaportList = () => {
    const { docData } = useDocData();
    const { executor } = useExecutor();
    const params = useParams();
    const { id } = params;
    const findeData = (id) => {
        return docData.find((user) => String(user.id) === id);
    };
    const user = findeData(id);

    return user !== undefined ? (
        <RaportData data={user} executor={executor} />
    ) : (
        <TableDoc users={docData} executor={executor} />
    );
};
export default RaportList;
