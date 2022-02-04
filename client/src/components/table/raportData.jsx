import React from "react";
import { useHistory } from "react-router";
import TimerCount from "../utils/timerCount";
import PropTypes from "prop-types";
import Executor from "../layout/ui/executor";
const RaportData = ({ data, executor }) => {
    const history = useHistory();
    const returnTable = () => {
        history.replace("/");
    };
    const reversString = (string) => {
        return string.split(".").reverse().join(",");
    };
    const time = TimerCount(reversString(data.periodOfExecution));
    const num = Number(time.split(" ")[0]);
    const currentColorRow =
        num < 0 ? { color: "tomato", fontSize: "3em" } : { color: "grey" };
    return (
        <div className="d-flex flex-column align-items-center bg-secondary bg-gradien bg-opacity-10 shadow text-black p-5 m-4">
            <h1>от {data.dateDoc} года</h1>
            <h1>пункт {data.punctDoc}</h1>
            <h1>{data.nameDoc}</h1>
            <h1>{data.typeDoc}</h1>
            <h1>
                <hr />
                инициатор: {data.nameInitiator}
            </h1>
            <h1>
                <hr />
                исполнить до: {data.periodOfExecution} года
            </h1>
            <h1 style={currentColorRow}>до исхода осталось: {time}</h1>
            <h1>
                <hr />
                исполнитель:{" "}
                <Executor
                    id={data.nameExecutor}
                    executor={executor}
                    keys={data.id}
                />
                <hr />
            </h1>
            <h4>{data.executionOrder}</h4>
            <button onClick={() => returnTable()}>return</button>
        </div>
    );
};
RaportData.propTypes = {
    data: PropTypes.object.isRequired,
    executor: PropTypes.array.isRequired
};
export default RaportData;
