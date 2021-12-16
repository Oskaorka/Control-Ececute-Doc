import React from "react";
import PropTypes from "prop-types";
const ListGroupTask = ({ item, onItemSelect, selectExecutor }) => {
    // console.log(item);
    // const [selectExecutor, setSelect] = useState();
    // const handleClick = (e) => {
    //     // console.log(e);
    //     setSelect(e.id);
    // };
    return (
        <ul className="list-group" style={{ marginRight: "1em" }}>
            {Object.values(item).map((e) => (
                <li
                    key={e.id}
                    className={
                        "list-group-item bg-" +
                        (selectExecutor && selectExecutor.id === e.id
                            ? "secondary"
                            : "")
                    }
                    role="button"
                    style={
                        selectExecutor && {
                            color: selectExecutor.id === e.id ? "tomato" : ""
                        }
                    }
                    onClick={() => onItemSelect(e)}
                >
                    {e.name}
                </li>
            ))}
        </ul>
    );
};
ListGroupTask.propTypes = {
    item: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    onItemSelect: PropTypes.func,
    selectExecutor: PropTypes.object
};
export default ListGroupTask;
