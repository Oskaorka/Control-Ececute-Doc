import React from "react";
import TableDoc from "./layout/tableDoc";
import { useParams } from "react-router-dom";
const Raport = () => {
  const params = useParams();
  const { id } = params;
  console.log(id);
  return params !== undefined ? <TableDoc /> : <h1>none</h1>;
};

export default Raport;
