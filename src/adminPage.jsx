import React from "react";
import TableDoc from "./components/table/tableDoc";
const AdminPage = ({ isAdmin }) => {
  return <TableDoc isAdmin={isAdmin} />;
};

export default AdminPage;
