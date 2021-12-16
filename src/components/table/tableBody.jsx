import React from "react";
import TimerCount from "../utils/timerCount";
import { Link } from "react-router-dom";
import "./tableBody.scss";
import PropTypes from "prop-types";
import Executor from "../layout/ui/executor";
const TableBody = ({ data, stateBtn, executor }) => {
    // console.log(data);
    return (
        <tbody>
            {data.map((el, i) => (
                // console.log(el.id);
                <tr
                    style={
                        Number(TimerCount(el.periodOfExecution).split(" ")[0]) >
                        0
                            ? { background: "#d2d4d2" }
                            : { background: "tomato" }
                        // : { background: "#d65038" }
                    }
                    key={el.id}
                >
                    <td>№ {i + 1}</td>
                    <td>{el.dateDoc}</td>
                    <td>{el.punctDoc}</td>
                    <td>{el.nameDoc}</td>
                    <td>{el.typeDoc}</td>
                    <td>
                        {el.nameInitiator}
                        {/* {console.log(el.id)} */}
                    </td>
                    <td>{TimerCount(el.periodOfExecution)}</td>
                    <Executor
                        keys={el.id}
                        id={el.nameExecutor}
                        executor={executor}
                    />
                    <td style={{ maxWidth: "80vw", minWidth: "20vw" }}>
                        {/* <td style={{ width: "min-content", display: "block" }}> */}

                        <Link
                            to={`/${el.id}`}
                            style={{
                                display: "block",
                                maxWidth: "30vw",
                                // whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis"
                                // linkDarkHover: {text-color: "red"},
                            }}
                            // className="link-dark"
                            className="dark"
                            // data-bs-toggle="tooltip"
                            data-bs-html="true"
                            title={el.executionOrder}
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
                // </>
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
