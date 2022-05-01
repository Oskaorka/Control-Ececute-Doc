import React from "react";
import TimerCount from "../utils/timerCount";
import { Link } from "react-router-dom";
import "./tableBody.scss";
import PropTypes from "prop-types";
import Executor from "../layout/ui/executor";
import { useAuth } from "../hooks/useAuth";
import getNumOrTime from "../utils/getResidualTime";
// import CreateNewDataTable from "../createNewDataTable";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import { updateDocData } from "../store/docData";
// import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
// import { useSelector } from "react-redux";
// import { getDataStatus, getDocDataLoadingStatus } from "../store/docData";
const TableBody = ({ data, executor, removeExecutor }) => {
    // console.log(data);
    // const data = useSelector(getDocData());
    // const status = useSelector(getDocDataLoadingStatus());
    // const docDataStatus = useSelector(getDataStatus());
    const { currentUser } = useAuth();
    const history = useHistory();
    const dispatch = useDispatch();
    const administrator = currentUser && currentUser.type === "admin";
    function reverseTime(time) {
        return TimerCount(time.split(".").reverse().join(","));
    }
// console.log(status);
// console.log(docDataStatus);
    // const p = getNumOrTime
    // function getNumOrTime(time) {
    //     const newNum = time.split(".");
    //     const parseEndTime = new Date(newNum[2], newNum[1] - 1, newNum[0]);
    //     if (getDayCount(parseEndTime) > 1) {
    //         return {
    //             background: "#ffffff"
    //         };
    //     }
    //     return {
    //         background: "#f72819ac"
    //     };
    // }

    // function getDayCount(dateEndTime) {
    //     const dateCurrentTime = Date.parse(new Date());
    //     const getTime = Date.parse(dateEndTime) - dateCurrentTime;
    //     const deadline = Math.floor(getTime / (24 * 60 * 60 * 1000));
    //     return deadline;
    // }
    const clickBtn = (el) => {
        removeExecutor(el);
    };
    const handleEditRow = (edit) => {
        // console.log(edit);
        dispatch(updateDocData(edit));
        history.push("/createNewDataTable");
    //    return <CreateNewDataTable/>;

        // return <Link to={"/createNewDataTable"}/>;
    //    return <Link to={`/${edit._id}`} className="dark">
    //     {edit.executionOrder}
    // </Link>;
        // <Switch>
        // <Route
        // path="/createNewDataTable"
        // component={CreateNewDataTable}
        // />;
        // </Switch>;
        // I need to create method or function which edit data in it row
    };
    // console.log(data);
    return (
        <tbody className="tbodyStyle">
            {data.map(
                (el, i) =>
                    // el.inWork.length !== 0 && (
                        <tr
                            style={
                                el.inWork.length !== 0
                                    ? getNumOrTime(el.periodOfExecution)
                                    : { background: "#9df2bf6a" }
                            }
                            key={el._id}
                        >
                            <td>{el.nameDoc}</td>
                            <td>№ {el.numberDoc}</td>
                            <td>{el.dateDoc}</td>
                            <td>{el.punctDoc}</td>
                            <td style={{ maxWidth: "80vw", minWidth: "20vw" }}>
                                <Link to={`/${el._id}`} className="dark">
                                    {el.executionOrder}
                                </Link>
                            </td>
                            <td>{el.nameInitiator}</td>
                            <td>
                                {/* {Date.parse(new Date()) -
                                    Date.parse(el.periodOfExecution)} */}
                                {el.periodOfExecution} <br />
                                {el.inWork.length === 0
                                    ? " прошло"
                                    : " осталось"}{" "}
                                <br />
                                {reverseTime(el.periodOfExecution)}
                                {/* {el.periodOfExecution} */}
                            </td>
                            {administrator && (
                                <><td>
                                {/* {el.inWork.length !== 0 && ( */}
                                <button
                                    onClick={() => clickBtn(el)}
                                    className="btn btn-light p-1 m-1 hoverz"
                                >
                                    снять контроль
                                </button>
                                {/* )} */}
                            </td>
                                </>
                            )}
                            {/* {el.inWork.length !== 0 ? ( */}
                                <td>
                                    <Executor
                                        key={el._id}
                                        id={el.inWork}
                                        executor={executor}
                                        />
                                </td>
                                        {administrator && (
                                            <><td>
                                            {/* {el.inWork.length !== 0 && ( */}
                                            <button
                                                onClick={() => handleEditRow(el)}
                                                className="btn btn-secondary p-1 m-1 hoverz"
                                            >
                                                изменить строку
                                                {/* <Link to={"/createNewDataTable"} className="dark">
                                                    {"изменить строку"}
                                                </Link> */}
                                                        {/* <Switch>
                                                        <Route path="/createNewDataTable">
                                                        <CreateNewDataTable/>
                                                        </Route>
                                                     </Switch> */}
                                            </button>
                                            {/* )} */}
                                        </td>
                                            </>
                                        )}
                            {/* // ) : ( */}
                                {/* <td className="event-complete">
                                    <span>мероприятие выполнено</span>
                                </td> */}
                            {/* // )} */}
                        </tr>
                    // )
            )}
        </tbody>
    );
};
TableBody.propTypes = {
    data: PropTypes.array,
    executor: PropTypes.array,
    stateBtn: PropTypes.bool,
    removeExecutor: PropTypes.func,
    setCurrenElem: PropTypes.func
};
export default TableBody;
