import React from "react";
import TimerCount from "../utils/timerCount";
import { Link } from "react-router-dom";
import "./tableBody.scss";
import PropTypes from "prop-types";
import Executor from "../layout/ui/executor";
const TableBody = ({ data, stateBtn, executor }) => {
    function reverseTime(time) {
        return TimerCount(time.split(".").reverse().join(","));
    }
    function getNumOrTime(time) {
        const num = Number(reverseTime(time).split(" ")[0]);
        if (num > 0) {
            return {
                background: "#d2d4d2"
            };
        }
        return {
            background: "tomato"
        };
    }
    return (
        <tbody>
            {data.map((el, i) => (
                <tr style={getNumOrTime(el.periodOfExecution)} key={el.id}>
                    <td>№ {i + 1}</td>
                    <td>{el.dateDoc}</td>
                    <td>{el.punctDoc}</td>
                    <td>{el.nameDoc}</td>
                    <td>{el.typeDoc}</td>
                    <td>{el.nameInitiator}</td>
                    <td>{reverseTime(el.periodOfExecution)}</td>
                    <td>
                        <Executor
                            keys={el.id}
                            id={el.nameExecutor}
                            executor={executor}
                        />
                    </td>
                    <td style={{ maxWidth: "80vw", minWidth: "20vw" }}>
                        {/* <td style={{ width: "min-content", display: "block" }}> */}

                        <Link
                            to={`/${el.id}`}
                            // style={{
                            //     display: "block",
                            //     maxWidth: "30vw",
                            //     // whiteSpace: "nowrap",
                            //     overflow: "hidden",
                            //     textOverflow: "ellipsis"
                            //     // linkDarkHover: {text-color: "red"},
                            // }}
                            // className="link-dark"
                            className="dark"
                            // data-bs-toggle="tooltip"
                            // data-bs-html="true"
                            // title={el.executionOrder}
                        >
                            {el.executionOrder}
                        </Link>
                    </td>
                    {stateBtn && (
                        <td style={{ background: "#E2E3E5" }}>
                            <button className="btn hover btn-light p-1 m-1">
                                delete
                            </button>
                        </td>
                    )}
                </tr>
            ))}
        </tbody>
    );
};
TableBody.propTypes = {
    data: PropTypes.array,
    executor: PropTypes.array,
    stateBtn: PropTypes.bool.isRequired
};
export default TableBody;
