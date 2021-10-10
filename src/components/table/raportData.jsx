import React from "react";
import { useHistory } from "react-router";
import TimerCount from "../utils/timerCount";
const RaportData = ({ data }) => {
  const history = useHistory();
  const returnTable = () => {
    history.replace("/");
  };
  const time = TimerCount(data.periodOfExecution);
  const num = Number(time.split(" ")[0]);
  return (
    <div className="d-flex flex-column align-items-center bg-secondary bg-gradien bg-opacity-10 shadow text-black p-5 m-4">
      <h1>{data.dateDoc}</h1>
      <h1>{data.punctDoc}</h1>
      <h1>{data.nameDoc}</h1>
      <h1>{data.typeDoc}</h1>
      <h1>{data.nameInitiator}</h1>
      <h1
        style={
          num < 0 ? { color: "tomato", fontSize: "3em" } : { color: "grey" }
        }
      >
        до исхода осталось: {time}
      </h1>
      <h1>{data.nameExecutor}</h1>
      <h4>{data.executionOrder}</h4>
      <button onClick={() => returnTable()}>return</button>
    </div>
  );
};

export default RaportData;
