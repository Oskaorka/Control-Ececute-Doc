import React from "react";
import TableDoc from "./components/table/tableDoc";
import PropTypes from "prop-types";
const AdminPage = ({ users, executor }) => {
    return <TableDoc users={users} executor={executor} />;
};
AdminPage.propTypes = {
    // isAdmin: PropTypes.bool.isRequired,
    executor: PropTypes.array.isRequired,
    users: PropTypes.array.isRequired
};
export default AdminPage;
