import React from "react";
const TableHeader = ({ stateBtn }) => {
  return (
    <thead className="table-secondary">
      <tr>
        <th>№ док-та</th>
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

export default TableHeader;
