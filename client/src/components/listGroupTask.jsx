import React from "react";
import PropTypes from "prop-types";
import "./listGroupTask.scss";
const ListGroupTask = ({
    item,
    onItemSelect,
    selectExecutor,
    handleResetFilter
}) => {
    const styleText = (id) => {
         // console.log(item);
         // console.log(selectExecutor);
        if (selectExecutor && selectExecutor._id === id) {
            return "styleText";
        }
        return "";
    };

    return (
        <div>
            <ul
                className="list-group list-group-flush"
                style={{ marginRight: "1em" }}
            >
                {Object.values(item).map((e) => (
                    <li
                        key={e._id}
                        className={`list-group-item ${styleText(e._id)}`}
                        role="button"
                        onClick={() => onItemSelect(e)}
                    >
                        {e.name}
                    </li>
                ))}
            </ul>
            <button
                className="btn btn-outline-secondary mt-2"
                style={{ marginRight: "1em" }}
                onClick={handleResetFilter}
            >
                все исполнители
            </button>
        </div>
    );
};
ListGroupTask.propTypes = {
    item: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    onItemSelect: PropTypes.func,
    selectExecutor: PropTypes.object,
    handleResetFilter: PropTypes.func
};
export default ListGroupTask;
