import React from "react";
import TableDoc from "../table/tableDoc";
import { useParams } from "react-router-dom";
import docData from "../fakeApi/lListPerson";
import RaportData from "../table/raportData";
const RaportList = ({ isAdmin }) => {
  const params = useParams();
  const { id } = params;
  const findeData = (id) => {
    return docData.find((user) => user.id === id);
  };
  const user = findeData(id);

  return user !== undefined ? (
    <RaportData data={user} />
  ) : (
    <TableDoc isAdmin={isAdmin} />
  );
};

export default RaportList;
