import React from "react";
import PropTypes from "prop-types";
const TableHeader = ({ stateBtn }) => {
    return (
        <thead className="table-secondary text-center">
            <tr>
                <th>
                    № <nobr>док-та</nobr>
                </th>
                <th>дата документа</th>
                <th>пункт</th>
                <th>наименование документа</th>
                <th>тип документа</th>
                <th>инициатор</th>
                <th>срок исполнения</th>
                <th>исполнитель</th>
                <th>предписание к исполнеинию</th>
                {stateBtn && <th></th>}
            </tr>
        </thead>
    );
};
TableHeader.propTypes = {
    stateBtn: PropTypes.bool.isRequired
};
export default TableHeader;
