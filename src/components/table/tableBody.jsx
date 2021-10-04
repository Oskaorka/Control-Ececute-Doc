import React from "react";
import TimerCount from "../utils/timerCount";
import { Link } from "react-router-dom";
const TableBody = ({ data }) => {
  return (
    <tbody>
      {data.map((el, i) => (
        <tr key={el + i}>
          <td>№ {i + 1}</td>
          <td>{el["date doc"]}</td>
          <td>{el["punct doc"]}</td>
          <td>{el["name doc"]}</td>
          <td>{el["type doc"]}</td>
          <td>{el["name initiator"]}</td>
          <td>{TimerCount(el["period of execution"])}</td>
          <td>{el["name executor"]}</td>
          <td>
            <Link
              to={`/${el.id}`}
              style={{
                display: "block",
                width: "43em",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {el["execution order"]}
            </Link>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
