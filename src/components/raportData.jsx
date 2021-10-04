import React from "react";
import { useHistory } from "react-router";
import TimerCount from "./utils/timerCount";
const RaportData = ({ data }) => {
  const history = useHistory();
  const returnTable = () => {
    history.replace("/");
  };
  return (
    <>
      <h1>{data["date doc"]}</h1>
      <h1>{data["punct doc"]}</h1>
      <h1>{data["name doc"]}</h1>
      <h1>{data["type doc"]}</h1>
      <h1>{data["name initiator"]}</h1>
      <h1>до исхода осталось: {TimerCount(data["period of execution"])}</h1>
      <h1>{data["name executor"]}</h1>
      <h4>{data["execution order"]}</h4>
      <button onClick={() => returnTable()}>return</button>
    </>
  );
};

export default RaportData;
