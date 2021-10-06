import React from "react";
import TimerCount from "../utils/timerCount";
import { Link } from "react-router-dom";
const TableBody = ({ data }) => {
  return (
    <tbody>
      {data.map((el, i) => (
        <tr
          // className="rounded-pill"
          style={
            Number(TimerCount(el.periodOfExecution).split(" ")[0]) > 0
              ? { background: "#63c27c" }
              : { background: "tomato" }
          }
          key={el.id}
        >
          <td>№ {i + 1}</td>
          <td>{el.dateDoc}</td>
          <td>{el.punctDoc}</td>
          <td>{el.nameDoc}</td>
          <td>{el.typeDoc}</td>
          <td>{el.nameInitiator}</td>
          <td>{TimerCount(el.periodOfExecution)}</td>

          <td>{el.nameExecutor}</td>
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
              // className="link-dark"
              className="link-dark"
              // hover="link-danger"
            >
              {el.executionOrder}
            </Link>
          </td>
        </tr>
        // </>
      ))}
    </tbody>
  );
};

export default TableBody;
