import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { validator } from "../utils/ validator";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import LoginFormUser from "./loginFormUser";
import LoginFormAdmin from "./loginFormAdmin";
import { useParams } from "react-router-dom";
const Login = () => {
    const { type } = useParams();
    const [formType, setFormType] = useState(
        type === "registerAdmin" ? type : "login"
    );
    const [data, setData] = useState({
        email: "",
        password: "",
        formType
    });
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState(null);
    const history = useHistory();
    const { signIn, signInAdmin } = useAuth();

    const toggleFormType = (params) => {
        setFormType((prevState) =>
            prevState === "registerAdmin" ? "login" : "registerAdmin"
        );
    };
    const handleChange = ({ target }) => {
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
            const newData = {
                ...data,
                formType
            };
            if (formType === "registerAdmin") {
                await signInAdmin(newData);
                return history.push("/");
            }
            if (formType === "login") {
                await signIn(newData);
                history.push("/information");
            }
        } catch (error) {
            setErrors(error);
            setErrorMessage(error.message);
        } finally {
            setData({
                email: "",
                password: ""
            });
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
    return (
        <>
            <div className="d-flex flex-column-reverse align-items-center m-4">
                {formType === "registerAdmin" ? (
                    <>
                        <p>
                            Если ты администратор
                            <a role="button" onClick={toggleFormType}>
                                &nbsp; Войти
                            </a>
                        </p>
                        <LoginFormAdmin
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                            errorMessage={errorMessage}
                            data={data}
                            inputstyle={inputstyle}
                            isValid={isValid}
                        />
                    </>
                ) : (
                    <>
                        <p>
                            Вход для пользователя
                            <a role="button" onClick={toggleFormType}>
                                &nbsp; Войти
                            </a>
                        </p>
                        <LoginFormUser
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                            errorMessage={errorMessage}
                            data={data}
                            inputstyle={inputstyle}
                            isValid={isValid}
                        />
                    </>
                )}
            </div>
        </>
    );
};
export default Login;
