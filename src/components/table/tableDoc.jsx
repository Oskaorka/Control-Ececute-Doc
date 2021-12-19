import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import { Link } from "react-router-dom";
import Pagination from "../pagination";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";
import ListGroupTask from "../listGroupTask";
// import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

const styleGrid = {
    gridTemplateColumns: "repeat(2, 1fr)",
    margin: "0 25px"
};

const TableDoc = ({ users, executor }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectExecutor, setSelect] = useState();
    // const [find, setFind] = useState();
    const { isAdmin } = useAuth();
    const count = users.length;
    const pageSize = 5;
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };
    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };
    const handleTaskSelect = (elem) => {
        setSelect(elem);
    };
    const handleResetFilter = () => {
        setSelect();
    };

    const findExecutor = (elem) => {
        if (typeof elem.nameExecutor === "object") {
            const getExecutor = elem.nameExecutor.filter(
                (executor) => executor === selectExecutor.id
            );
            return getExecutor[0];
        }
        return elem.nameExecutor === selectExecutor.id;
    };

    const filteredExecutor = selectExecutor
        ? users.filter((user) => findExecutor(user))
        : users;

    const dataUserCrop = paginate(filteredExecutor, currentPage, pageSize);
    return (
        <div className="d-grid m-4" style={styleGrid}>
            {/* {count > 0 && ( */}

            <ListGroupTask
                item={executor}
                onItemSelect={handleTaskSelect}
                selectExecutor={selectExecutor}
            />
            {/* )} */}
            {/* <div className="d-flex flex-row-reverse align-items-center m-4"> */}
            {filteredExecutor.length > 0 ? (
                // <div className="m-4">
                <Table striped bordered hover className="table">
                    <TableHeader stateBtn={isAdmin} />
                    <TableBody
                        data={dataUserCrop}
                        executor={executor}
                        stateBtn={isAdmin}
                        // className="m-4"
                    />
                </Table>
            ) : (
                // </div>
                <h1>Нет задач к исполнению</h1>
            )}
            <button
                className=" mt-2"
                style={{ marginRight: "1em" }}
                onClick={handleResetFilter}
            >
                все исполнители
            </button>
            {/* pagination on subdivision structures */}
            {/* <nav aria-label="d-flex Page navigation example"> */}
            <Pagination
                itemsCount={count}
                pageSize={pageSize}
                onPageChange={handlePageChange}
                currentPage={currentPage}
                nextPage={handleNextPage}
                prevPage={handlePrevPage}
            />
            {isAdmin && (
                <div className="m-5">
                    <Link
                        className="btn btn-secondary"
                        to="/createNewDataTable"
                        role="button"
                    >
                        Добавить данные в таблицу
                    </Link>
                </div>
            )}
        </div>
        // </div>
    );
};
TableDoc.propTypes = {
    // isAdmin: PropTypes.bool.isRequired,
    users: PropTypes.array,
    executor: PropTypes.array
};
export default TableDoc;
