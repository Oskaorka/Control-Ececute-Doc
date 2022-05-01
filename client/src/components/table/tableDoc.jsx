import React, { useState, useEffect } from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import Pagination from "../pagination";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";
import ListGroupTask from "../listGroupTask";
import "./tableDoc.scss";
import RemoveFormExecutor from "../form/removeFormExecutor";
// import parseDate from "../utils/parseDate";
import { getExecutor } from "../store/executor";
import { useSelector } from "react-redux";
import { getDocData } from "../store/docData";

const styleGrid = {
    gridTemplateColumns: "140px 1fr",
    margin: "0 25px"
};

const TableDoc = () => {
    const docData = useSelector(getDocData());
    // const dispatch = useDispatch();
    useEffect(() => {
        // dispatch
        // console.log(docData);
    }, [docData]);
    // const docDataLoading = useSelector(getDocDataLoadingStatus());
    // const docDataStatus = useSelector(getDataStatus());
    // const dispatch = useDispatch();
    // useEffect(() => {
    //     if (!docDataStatus) dispatch(loadDocDataList());
    // }, []);
    // if (!docDataStatus) return "loading Docdata";
    // console.log(docDataStatus);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectExecutor, setSelect] = useState();
    const [selectData, setSelectData] = useState();
    const [count, setCount] = useState(docData.length);
    const [stateDispaly, setStateDispaly] = useState("hidden");

    const executor = useSelector(getExecutor());
    // const executorLoading = useSelector(getExecutorLoadingStatus());
    const pageSize = 250;
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
// console.log(executor);
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
    const filteredExecutor = selectExecutor
        ? docData.filter((user) => findExecutor(user))
        : docData;
    useEffect(() => {
        setCount(filteredExecutor.length);
    }, [filteredExecutor.length]);
    const dataUserCrop = paginate(filteredExecutor, currentPage, pageSize);
    const countTasks = dataUserCrop.filter((e) => {
        return e.inWork.length > 0;
    });
    // console.log(dataUserCrop);
    // console.log(countTasks);
    // console.log(docData);
    const removeExecutor = (e) => {
        // console.log(e);
        setStateDispaly("show");
        setSelectData(e);
    };

    // function dataSort(data) {
    //     return data.sort(function (a, b) {
    //         return (
    //             parseDate(a.periodOfExecution) - parseDate(b.periodOfExecution)
    //         );
    //     });
    // }
// console.log(executorLoading);
// console.log(docData);
// const data = docData.filter(e => {
//     return e.inWork.length > 0;
// });
// console.log(data);

    return (
        <>
            <div className="d-flex justify-content-around">
                <div> Задач к исполнению всего {countTasks.length} </div>
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
                            // data={dataSort(dataUserCrop)}
                            // data={docData}
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
