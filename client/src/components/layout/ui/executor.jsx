import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getExecutor } from "../../store/executor";
const Executor = ({ id, keys }) => {
    const executor = useSelector(getExecutor());
    const name = (ID) =>
        executor.map((e) => {
            if (e._id === ID) {
                return e.name;
            }

            if (typeof ID === "object") {
                const namez = ID.map((elem) => {
                    if (elem === e._id) {
                        return e.name + "; ";
                    }
                    return null;
                });
                return namez;
            }
            return null;
        });

    return <span key={keys}>{name(id)}</span>;
};
Executor.propTypes = {
    id: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    executor: PropTypes.array,
    keys: PropTypes.string
};
export default Executor;
// need refactoring function
// "1638735227", null, "1638735223", "1638735225";
