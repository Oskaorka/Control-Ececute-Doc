import React, { useState, useEffect } from "react";
import FormField from "./formField";
import docDataService from "./service/docService";
// import MultiSelectField from "./form/MultiSelectField";
import { useExecutor } from "../components/hooks/useExecutor";
import MultiSelectField from "./form/MultiSelectField";
const CreateNewDataTable = () => {
    const [data, setData] = useState({
        punctDoc: "",
        dateDoc: "",
        nameDoc: "",
        typeDoc: "",
        nameInitiator: "",
        periodOfExecution: "",
        executionOrder: "",
        nameExecutor: []
    });
    const { executor } = useExecutor();
    // console.log(executor);
    const executorList = executor.map((q) => ({
        label: q.name,
        value: q.id
    }));
    // console.log(executorList[3].value);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (error !== null) {
            setError(null);
        }
    }, [error]);

    const getId = Date.parse(new Date());
    const handleChange = (target) => {
        console.log(target);
        setData((prevstate) => ({
            ...prevstate,
            [target.name]: target.value
        }));
        // console.log(data);
    };
    const handleChangeForText = ({ target }) => {
        // console.log(target);
        setData((prevstate) => ({
            ...prevstate,
            [target.name]: target.value
        }));
        // console.log(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newData = {
            ...data,
            id: getId,
            nameExecutor: data.nameExecutor.map((q) => q.value)
        };
        await docDataService.create(newData);
        console.log(newData);
    };
    // нужно будет сделать валидацию вводу (правильно , неправильно , все ли данные введены и т.д.)
    return (
        <div className="m-4">
            <h3>Вносим данные для отображения в таблице</h3>
            <form
                onSubmit={handleSubmit}
                className="d-flex flex-column align-items-center"
            >
                <div className="d-flex ">
                    <div className="">
                        {/* {console.log(data)} */}
                        <FormField
                            name="dateDoc"
                            nameLabel={"дата документа в формате д.м.г"}
                            value={data.dateDoc}
                            onChange={handleChangeForText}
                            description={"12.09.2021"}
                        />
                        <FormField
                            name="punctDoc"
                            value={data.punctDoc}
                            onChange={handleChangeForText}
                            nameLabel={"пункт документа"}
                            description={"2.3.1"}
                        />
                        <FormField
                            nameLabel={"название док-та"}
                            name="nameDoc"
                            onChange={handleChangeForText}
                            value={data.nameDoc}
                            description={"Военный совет"}
                        />
                        <FormField
                            nameLabel={"тип док-та"}
                            name="typeDoc"
                            onChange={handleChangeForText}
                            value={data.typeDoc}
                            description={"распоряжение"}
                        />
                    </div>
                    <div className="">
                        <FormField
                            onChange={handleChangeForText}
                            nameLabel={"инициатор"}
                            description={"Пупкин А.А."}
                            name="nameInitiator"
                            value={data.nameInitiator}
                        />
                        <FormField
                            onChange={handleChangeForText}
                            nameLabel={"срок исполнения До  в формате г.м.д"}
                            name="periodOfExecution"
                            vale={data.periodOfExecution}
                            description={"2021,31,12"}
                            // description={"введите логин"}
                        />
                        {/* <FormField
                            onChange={handleChange}
                            nameLabel={"выбрать исполнителя"}
                            name="nameExecutor"
                            value={data.nameExecutor}
                            description={"ОМОН"}
                        /> */}
                        <MultiSelectField
                            options={executorList}
                            // options={executor}
                            onChange={handleChange}
                            name="nameExecutor"
                            label="Выбрать исполнителя"
                        />
                        {/* <FormField name="executionOrder" /> */}
                    </div>
                </div>
                <div className="input-group m-4 ">
                    <span className="input-group-text">Описание документа</span>
                    <textarea
                        onChange={handleChangeForText}
                        // nameLabel={"введите содержание задания"}
                        className="form-control"
                        aria-label="With textarea"
                        name="executionOrder"
                        value={data.executionOrder}
                        description={"описание задачи"}
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
