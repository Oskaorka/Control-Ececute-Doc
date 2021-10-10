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
              description={"введите логин"}
            />
            <FormField
              nameLabel={"название док-та"}
              description={"введите логин"}
              name="nameDoc"
            />
            <FormField
              nameLabel={"тип док-та"}
              description={"введите логин"}
              name="typeDoc"
            />
          </div>
          <div className="">
            <FormField
              nameLabel={"инициатор"}
              description={"введите логин"}
              name="nameInitiator"
            />
            <FormField
              nameLabel={"срок исполнения До"}
              name="periodOfExecution"
              description={"введите логин"}
              // description={"введите логин"}
            />
            <FormField
              nameLabel={"имя исполнителя"}
              description={"введите логин"}
              name="nameExecutor"
            />
            {/* <FormField name="executionOrder" /> */}
          </div>
        </div>
        <textarea
          name="содержительная часть"
          placeholder="l;l;fksdflk"
        ></textarea>
        <button>Сохранить</button>
      </form>
    </div>
  );
};

export default CreateNewDataTable;
