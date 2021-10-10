import React from "react";
import TimerCount from "../utils/timerCount";
import { Link } from "react-router-dom";
const TableBody = ({ data, stateBtn }) => {
  return (
    <tbody>
      {data.map((el, i) => (
        <tr
          style={
            Number(TimerCount(el.periodOfExecution).split(" ")[0]) > 0
              ? // ? { background: "#63c27c" }
                { background: "#d2d4d2" }
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
                width: "40em",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              className="link-dark"
              data-bs-toggle="tooltip"
              data-bs-html="true"
              title={el.executionOrder}
            >
              {el.executionOrder}
            </Link>
          </td>
          {stateBtn && (
            <td style={{ background: "#E2E3E5" }}>
              <button
                // style={{ background: "#bdbdbd" }}
                className="btn hover btn-light p-1 m-1"
              >
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

export default TableBody;
