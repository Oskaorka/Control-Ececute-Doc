import React from "react";
import TableDoc from "../table/tableDoc";
import { useParams } from "react-router-dom";
import RaportData from "../table/raportData";

const RaportList = () => {
    const params = useParams();
    const { _id } = params;

    return _id !== undefined ? <RaportData /> : <TableDoc />;
};
export default RaportList;
