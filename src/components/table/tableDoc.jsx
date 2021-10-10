import Table from "react-bootstrap/Table";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import docTasks from "../fakeApi/lListPerson";
import { Link } from "react-router-dom";

const TableDoc = ({ isAdmin }) => {
  return (
    <div className="d-flex flex-column align-items-center m-4">
      <Table striped bordered hover className="table">
        <TableHeader stateBtn={isAdmin} />
        <TableBody data={docTasks} stateBtn={isAdmin} />
      </Table>
      {isAdmin && (
        <div className="m-5">
          <Link
            className="btn btn-secondary"
            to="/createNewDataTable"
            role="button"
          >
            Добавить данные в таблицу
          </Link>
        </div>
      )}
    </div>
  );
};

export default TableDoc;
