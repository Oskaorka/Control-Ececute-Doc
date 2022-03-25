import React from "react";
import TimerCount from "../utils/timerCount";
import { Link } from "react-router-dom";
import "./tableBody.scss";
import PropTypes from "prop-types";
import Executor from "../layout/ui/executor";
import { useAuth } from "../hooks/useAuth";
import getNumOrTime from "../utils/getResidualTime";
const TableBody = ({ data, executor, removeExecutor }) => {
    const { currentUser } = useAuth();
    function reverseTime(time) {
        return TimerCount(time.split(".").reverse().join(","));
    }
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
    return (
        <tbody className="tbodyStyle">
            {data.map(
                (el, i) =>
                    el.inWork.length !== 0 && (
                        <tr
                            style={
                                el.inWork.length !== 0
                                    ? getNumOrTime(el.periodOfExecution)
                                    : { background: "#9df2bf6a" }
                            }
                            key={el.id}
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
                            </td>
                            {currentUser && currentUser.type === "admin" && (
                                <td>
                                    {el.inWork.length !== 0 && (
                                        <button
                                            onClick={() => clickBtn(el)}
                                            className="btn btn-light p-1 m-1 hoverz"
                                        >
                                            снять контроль
                                        </button>
                                    )}
                                </td>
                            )}
                            {el.inWork.length !== 0 ? (
                                <td>
                                    <Executor
                                        keys={el._id}
                                        id={el.inWork}
                                        executor={executor}
                                    />
                                </td>
                            ) : (
                                <td className="event-complete">
                                    <span>мероприятие выполнено</span>
                                </td>
                            )}
                        </tr>
                    )
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
