import React from "react";
import TableDoc from "../table/tableDoc";
import { useParams } from "react-router-dom";
import RaportData from "../table/raportData";
import PropTypes from "prop-types";
import { useDocData } from "../hooks/useDocData";
import { useExecutor } from "../hooks/useExecutor";

const RaportList = ({ isAdmin }) => {
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
        <TableDoc isAdmin={isAdmin} users={docData} executor={executor} />
    );
};
RaportList.propTypes = {
    isAdmin: PropTypes.bool.isRequired
};
export default RaportList;
