import React from "react";
import PropTypes from "prop-types";
const Executor = ({ id, executor, keys }) => {
    const name = (ID) =>
        executor.map((e) => {
            if (e.id === ID) {
                return e.name;
            }

            if (typeof ID === "object") {
                const namez = ID.map((elem) => {
                    if (elem === e.id) {
                        return e.name + "; ";
                    }
                    return null;
                });

                return namez;
            }
            return null;
        });

    return <span key={keys}>исполнитель: {name(id)}</span>;
};
Executor.propTypes = {
    id: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    executor: PropTypes.array,
    keys: PropTypes.number
};
export default Executor;
// need refactoring function
// "1638735227", null, "1638735223", "1638735225";
