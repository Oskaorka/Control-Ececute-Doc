import React, { useState, useEffect } from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import Pagination from "../pagination";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";
import ListGroupTask from "../listGroupTask";
// import SearchPanel from "../searchPanel";
import "./tableDoc.scss";
import RemoveFormExecutor from "../form/removeFormExecutor";

const styleGrid = {
    gridTemplateColumns: "140px 1fr",
    margin: "0 25px"
};

const TableDoc = ({ docData, executor }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectExecutor, setSelect] = useState();
    const [selectData, setSelectData] = useState();
    const [count, setCount] = useState(docData.length);
    const [stateDispaly, setStateDispaly] = useState("hidden");
    // const [searchQuery, setSearchQuery] = useState("");

    const pageSize = 250;
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
        if (typeof elem.inWork === "object") {
            const getExecutor = elem.inWork.filter(
                (executor) => executor === selectExecutor._id
            );
            return getExecutor[0];
        }
        return elem.inWork === selectExecutor._id;
    };
    // if (docData) {

    const filteredExecutor =
        //  searchQuery
        //     ? docData.filter((data) =>
        //           data.nameDoc
        //               .toLowerCase()
        //               .indexOf(searchQuery.toLowerCase() !== -1)
        //       )
        //     :
        selectExecutor ? docData.filter((user) => findExecutor(user)) : docData;
    useEffect(() => {
        setCount(filteredExecutor.length);
    }, [filteredExecutor.length]);
    const dataUserCrop = paginate(filteredExecutor, currentPage, pageSize);
    const countTasks = dataUserCrop.filter((e) => {
        return e.inWork.length > 0;
    });
    // }
    const removeExecutor = (e) => {
        setStateDispaly("show");
        setSelectData(e);
    };
    // const handleSearch = ({ target }) => {
    //     setSearchQuery(target.value);
    //     console.log(searchQuery);
    // };
    // console.log(filteredExecutor);
    // console.log(
    //     docData.map((data) =>
    //         // data.nameDoc.toLowerCase().indexOf(searchQuery.toLowerCase() !== -1)
    //         data.nameDoc.toLowerCase().indexOf(searchQuery.toLowerCase() !== -1)
    //     )
    // );
    return (
        <>
            <div className="d-flex justify-content-around">
                <div> Задач к исполнению всего {countTasks.length} </div>
                {/* <SearchPanel onChange={handleSearch} value={searchQuery} /> */}
            </div>
            <div className="d-grid  m-4" style={styleGrid}>
                <ListGroupTask
                    item={executor}
                    onItemSelect={handleTaskSelect}
                    selectExecutor={selectExecutor}
                    handleResetFilter={handleResetFilter}
                />

                {filteredExecutor.length > 0 ? (
                    <table className="tableMain">
                        <TableHeader />
                        <TableBody
                            data={dataUserCrop}
                            executor={executor}
                            removeExecutor={removeExecutor}
                        />
                    </table>
                ) : (
                    <h1>Нет задач к исполнению</h1>
                )}
                <RemoveFormExecutor
                    stateDispaly={stateDispaly}
                    setStateDispaly={setStateDispaly}
                    selectData={selectData}
                />

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
            </div>
        </>
    );
};
TableDoc.propTypes = {
    docData: PropTypes.array,
    executor: PropTypes.array
};
export default TableDoc;
