import React from "react";
import TimerCount from "../utils/timerCount";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
// import Login from "../layout/login";
const TableBody = ({ data }) => {
  const params = useParams();
  //   const { id } = params;
  console.log(params);
  console.log(data);
  console.log(TimerCount(2021, 11, 21));
  const clickz = () => {
    console.log("zzz");
    // return <Login />;
  };
  return (
    <tbody>
      {data.map((el, i) => (
        <tr onClick={() => clickz()} key={el + i}>
          {/* {console.log(el["period of execution"].split(","))} */}
          {/* {const a = (el["period of execution"].split(","))} */}
          <td>№ {i + 1}</td>
          <td>{el["date doc"]}</td>
          <td>{el["punct doc"]}</td>
          <td>{el["name doc"]}</td>
          <td>{el["type doc"]}</td>
          <td>{el["name initiator"]}</td>
          <td>{el["period of execution"]}</td>
          <td>{el["name executor"]}</td>
          <td>
            {/* <p
              style={{
                display: "block",
                width: "43em",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            > */}
            <Link
              to={`/raport/${el.id}`}
              style={{
                display: "block",
                width: "43em",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {/* {console.log(params)} */}
              {el["execution order"]}
            </Link>
            {/* {el["execution order"]} */}
            {/* </p> */}
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
