import React from "react";
import FormField from "../formField";
import MultiSelectField from "./multiSelectField";
import PropTypes from "prop-types";

const AddDataForm = ({
    handleSubmit,
    executorList,
    handleChange,
    handleChangeForText,
    clickBack,
    nameDoc,
    numberDoc,
    punctDoc,
    dateDoc,
    nameInitiator,
    typeDoc,
    periodOfExecution,
    executionOrder
            }) => {
    return (
        <div className="m-4">
            <button className="btn btn-outline-secondary" onClick={clickBack}>
                назад
            </button>
            <h3 className="text-center">
                Вносим данные для отображения в таблице
            </h3>
            <form
                onSubmit={handleSubmit}
                className="d-flex flex-column align-items-center"
            >
                <div className="d-flex flex-row justify-content-center flex-wrap">
                    <div className="wrapper-field wrapper-field-left">
                        <FormField
                            nameLabel={"название док-та"}
                            name="nameDoc"
                            onChange={handleChangeForText}
                            value={nameDoc}
                            description={"Военный совет"}
                            type="text"
                        />
                        <FormField
                            name="numberDoc"
                            value={numberDoc}
                            onChange={handleChangeForText}
                            nameLabel={"номер документа"}
                            description={"шт 300/500-234"}
                            type="text"
                        />
                        <FormField
                            name="punctDoc"
                            value={punctDoc}
                            onChange={handleChangeForText}
                            nameLabel={"пункт документа"}
                            description={"2.3.1"}
                            type="text"
                        />
                        <FormField
                            name="dateDoc"
                            nameLabel={"дата документа"}
                            value={dateDoc}
                            onChange={handleChangeForText}
                            description={"12.09.2021"}
                            type="date"
                        />
                    </div>
                    <div className="wrapper-field wrapper-field-right">
                        <FormField
                            onChange={handleChangeForText}
                            nameLabel={"инициатор"}
                            description={"Пупкин А.А."}
                            name="nameInitiator"
                            value={nameInitiator}
                            type="text"
                        />
                        <FormField
                            nameLabel={"вид доклада"}
                            name="typeDoc"
                            onChange={handleChangeForText}
                            value={typeDoc}
                            description={"пояснительная записка"}
                            type="text"
                        />
                        <FormField
                            onChange={handleChangeForText}
                            nameLabel={"исполнить до"}
                            name="periodOfExecution"
                            value={periodOfExecution}
                            description={"2021,31,12"}
                            type="date"
                        />
                    </div>
                    <MultiSelectField
                        options={executorList}
                        onChange={handleChange}
                        name="nameExecutor"
                        label="Выбрать исполнителя"
                    />
                </div>
                <div className="input-group m-4 ">
                    <span className="input-group-text">Описание документа</span>
                    <textarea
                        onChange={handleChangeForText}
                        className="form-control"
                        aria-label="With textarea"
                        name="executionOrder"
                        value={executionOrder}
                        description={"описание задачи"}
                    ></textarea>
                </div>
                <button className="btn btn-outline-secondary">
                    Добавить данные в контроль
                </button>
            </form>
        </div>
    );
};
AddDataForm.propTypes = {
    handleSubmit: PropTypes.func,
    handleChangeForText: PropTypes.func,
    clickBack: PropTypes.func,
    executorList: PropTypes.array,
    handleChange: PropTypes.func,
    nameDoc: PropTypes.string,
    numberDoc: PropTypes.string,
    punctDoc: PropTypes.string,
    dateDoc: PropTypes.string,
    nameInitiator: PropTypes.string,
    typeDoc: PropTypes.string,
    periodOfExecution: PropTypes.string,
    executionOrder: PropTypes.string
};
export default AddDataForm;
