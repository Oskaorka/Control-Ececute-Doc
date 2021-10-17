import React, { useState } from "react";
import FormField from "./formField";
const CreateNewDataTable = () => {
  const [data, setData] = useState({ punctDoc: "", dateDoc: "" });
  const handleChange = ({ target }) => {
    setData((prevstate) => ({
      ...prevstate,
      [target.name]: target.value,
    }));
  };
  return (
    <div>
      <h3>Вносим данные для отображения в таблице</h3>
      <form action="" className="d-flex flex-column align-items-center">
        <div className="d-flex ">
          <div className="">
            {/* {console.log(data)} */}
            <FormField
              name="dataDoc"
              nameLabel={"дата док-та в формате д.м.г"}
              value={data.dataDoc}
              onChange={handleChange}
              description={"12.09.2021"}
            />
            <FormField
              name="punctDoc"
              value={data.punctDoc}
              onChange={handleChange}
              nameLabel={"пункт док-та"}
              description={"пункт 2.3.1"}
            />
            <FormField
              nameLabel={"название док-та"}
              name="nameDoc"
              description={"Военный совет"}
            />
            <FormField
              nameLabel={"тип док-та"}
              name="typeDoc"
              description={"распоряжение"}
            />
          </div>
          <div className="">
            <FormField
              nameLabel={"инициатор"}
              description={"Пупкин А.А."}
              name="nameInitiator"
            />
            <FormField
              nameLabel={"срок исполнения До"}
              name="periodOfExecution"
              description={"31.12.2021"}
              // description={"введите логин"}
            />
            <FormField
              nameLabel={"имя исполнителя"}
              name="nameExecutor"
              description={"Вакутагин Г.З."}
            />
            {/* <FormField name="executionOrder" /> */}
          </div>
        </div>
        <div className="input-group m-4 ">
          <span className="input-group-text">Описание документа</span>
          <textarea
            className="form-control"
            aria-label="With textarea"
          ></textarea>
        </div>
        {/* <textarea
          name="содержительная часть"
          placeholder="l;l;fksdflk"
        ></textarea> */}
        <button>Сохранить</button>
      </form>
    </div>
  );
};

export default CreateNewDataTable;
