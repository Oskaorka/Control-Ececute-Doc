import React from "react";
import PropTypes from "prop-types";

const SearchPanel = ({ onChange, value }) => {
    return (
        <div>
            <input
                onChange={onChange}
                value={value}
                type="text"
                name="searchQuery"
                placeholder="Поиск..."
            />
        </div>
    );
};
SearchPanel.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string
};
export default SearchPanel;
