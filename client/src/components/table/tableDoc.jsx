import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import { Link } from "react-router-dom";
import Pagination from "../pagination";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";
import ListGroupTask from "../listGroupTask";
import SearchPanel from "../searchPanel";
import { useAuth } from "../hooks/useAuth";

const styleGrid = {
    gridTemplateColumns: "repeat(2, 1fr)",
    margin: "0 25px"
};

const TableDoc = ({ users, executor }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectExecutor, setSelect] = useState();
    const [count, setCount] = useState(users.length);
    // const [find, setFind] = useState();
    // console.log(users);
    // useEffect(() => {
    //     if (users) {
    //         setIsloading(true);
    //     }
    // }, [isLoading]);

    // console.log(isLoading);
    const { isAdmin } = useAuth();
    // const count = users.length;
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
    useEffect(() => {
        setCount(filteredExecutor.length);
    }, [filteredExecutor.length]);
    console.log(count);
    const dataUserCrop = paginate(filteredExecutor, currentPage, pageSize);
    return (
        <>
            <div className="d-flex justify-content-around">
                <div>{count} задачи к исполнению</div>
                <SearchPanel />
            </div>
            <div className="d-grid m-4" style={styleGrid}>
                <ListGroupTask
                    item={executor}
                    onItemSelect={handleTaskSelect}
                    selectExecutor={selectExecutor}
                />
                {filteredExecutor.length > 0 ? (
                    <Table striped bordered hover className="table">
                        <TableHeader stateBtn={isAdmin} />
                        <TableBody
                            data={dataUserCrop}
                            executor={executor}
                            stateBtn={isAdmin}
                        />
                    </Table>
                ) : (
                    <h1>Нет задач к исполнению</h1>
                )}
                <button
                    className=" mt-2"
                    style={{ marginRight: "1em" }}
                    onClick={handleResetFilter}
                >
                    все исполнители
                </button>
                {/* // условие */}
                {count >= pageSize ? (
                    <Pagination
                        itemsCount={count}
                        pageSize={pageSize}
                        onPageChange={handlePageChange}
                        currentPage={currentPage}
                        nextPage={handleNextPage}
                        prevPage={handlePrevPage}
                    />
                ) : null}
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
        </>
    );
};
TableDoc.propTypes = {
    users: PropTypes.array,
    executor: PropTypes.array
};
export default TableDoc;
