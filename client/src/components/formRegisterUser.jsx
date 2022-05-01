import React, { useState, useEffect } from "react";
import FormField from "./formField";
import { useHistory } from "react-router-dom";
import { validator } from "./utils/ validator";
import SelectField from "./form/selectField";
import { useAuth } from "./hooks/useAuth";
import CheckField from "./form/checkField";
import { useSelector } from "react-redux";
import { getExecutor } from "./store/executor";
const FormRegisterUser = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        name: "",
        executor: "",
        type: "user"
    });
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState(null);
    const history = useHistory();
    const { signUp, signUpAdmin, currentUser } = useAuth();
    const executor = useSelector(getExecutor());

    const executorList = executor.map((q) => ({
        label: q.name,
        value: q._id
    }));
    const handleChange = ({ target }) => {
        setData((prevstate) => ({
            ...prevstate,
            [target.name]: target.value
        }));
        setErrorMessage(null);
    };
    const handleChangeSelectForm = (target) => {
        setData((prevstate) => ({
            ...prevstate,
            [target.name]: target.value
        }));
        setErrorMessage(null);
    };
    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязательна для заполнения"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;
    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        try {
            console.log(data);
            if (data.type === "admin") {
                await signUpAdmin(data);
            }
            if (data.type === "user") {
                await signUp(data);
            }
        } catch (error) {
            setErrors(error);
            setErrorMessage(error.message);
        }
    };
    const inputstyle = {
        textAlign: "center",
        padding: "8px",
        borderRadius: "12px",
        border: "none",
        outline: "none",
        boxShadow: "1px 1px 14px #d1cbcb"
        // boxShadow: "1px 1px 14px #ff9494"
    };
    const clickBack = () => {
        history.push(`/userlist/${currentUser._id}`);
    };
    return (
        <>
            <button onClick={clickBack}>назад</button>
            <form
                style={{ width: "20%" }}
                onSubmit={handleSubmit}
                className="d-flex flex-column align-items-center mt-2"
            >
                {errorMessage && <p className="text-danger">{errorMessage}</p>}
                <FormField
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    styleInput={inputstyle}
                    nameLabel={"Создать логин"}
                    description={"введите логин"}
                    type="text"
                />
                <FormField
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    styleInput={inputstyle}
                    nameLabel={"Создать пароль"}
                    description={"введите пароль"}
                    type="text"
                />
                <FormField
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    styleInput={inputstyle}
                    nameLabel={"Создать имя"}
                    description={"введите имя"}
                    type="text"
                />
                <SelectField
                    label="Выбрать подразделение"
                    defaultOption="выбрать....."
                    name="executor"
                    options={executorList}
                    onChange={handleChangeSelectForm}
                    value={data.executor}
                    error={errors.executor}
                />
                <CheckField
                    options={[
                        { name: " Права администратора", value: "admin" },
                        { name: "Права пользователя", value: "user" }
                    ]}
                    value={data.type}
                    name="type"
                    onChange={handleChangeSelectForm}
                    label="Выберите тип"
                />
                <button
                    style={{
                        border: "none",
                        boxShadow: "0px 0px 34px #d1cbcb"
                    }}
                    className="btn btn-outline-secondary mt-4 d-md-flex justify-content-md-center"
                    type="submit"
                    disabled={!isValid || errorMessage}
                >
                    ввести данные
                </button>
            </form>
        </>
    );
};

export default FormRegisterUser;
