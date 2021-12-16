import React from "react";
import TableDoc from "./components/table/tableDoc";
import PropTypes from "prop-types";
const AdminPage = ({ isAdmin, users, executor }) => {
    return <TableDoc isAdmin={isAdmin} users={users} executor={executor} />;
};
AdminPage.propTypes = {
    isAdmin: PropTypes.bool.isRequired,
    executor: PropTypes.array.isRequired,
    users: PropTypes.array.isRequired
};
export default AdminPage;
