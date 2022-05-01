import React from "react";
import { useHistory } from "react-router";
import TimerCount from "../utils/timerCount";
import Executor from "../layout/ui/executor";
import { useAuth } from "../hooks/useAuth";
import getNumOrTime from "../utils/getResidualTime";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getDocData } from "../store/docData";

const RaportData = () => {
    const docData = useSelector(getDocData());
    const params = useParams();
    const { _id } = params;
    const findeData = (id) => {
        return docData.find((user) => String(user._id) === id);
    };
    const data = findeData(_id);

    const { currentUser } = useAuth();
    const history = useHistory();
    const returnTable = () => {
        if (currentUser && currentUser.type === "user") {
            history.replace(`/userlist/${currentUser._id}`);
        } else {
            history.replace(`/`);
        }
    };

    const reversString = (string) => {
        return string.split(".").reverse().join(",");
    };
    const time = TimerCount(reversString(data.periodOfExecution));

    return (
        <div className="d-flex flex-column align-items-center bg-secondary bg-gradien bg-opacity-10 shadow text-black p-5 m-4">
            <div className="fs-3">
                {data.nameDoc} от {data.dateDoc} года, пункт {data.punctDoc}
            </div>
            <p className="fs-3">форма доклада: {data.typeDoc}</p>
            <p className="fs-3">
                документ представить на имя: {data.nameInitiator}
            </p>
            <p className="fs-3">
                срок исполнения до: {data.periodOfExecution} года
            </p>
            <p className="fs-3" style={getNumOrTime(data.periodOfExecution)}>
                до исхода осталось: {time}
            </p>
            <p className="fs-3">
                исполнитель(и):{" "}
                <Executor id={data.executorName} keys={data._id} />
            </p>
            <p className="fs-2" style={{ wordBreak: "break-all" }}>
                Мероприятие: {data.executionOrder}
            </p>
            <button
                className="btn btn-outline-secondary"
                onClick={() => returnTable()}
            >
                вернуться назад
            </button>
        </div>
    );
};
export default RaportData;
