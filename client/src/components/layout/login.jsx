import React, { useState, useEffect } from "react";
import FormField from "../formField";
// import AdminPage from "../../adminPage";
// import { useDocData } from "../hooks/useDocData";
// import { useExecutor } from "../hooks/useExecutor";
import { useAuth } from "../hooks/useAuth";
import { validator } from "../utils/ validator";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const Login = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        stayOn: false
    });
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState(null);
    const history = useHistory();
    // const { docData } = useDocData();
    // const { executor } = useExecutor();
    const { signUp } = useAuth();

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
    // admin@rosgvard.ru   qaz2021
    // admin@rosgv.ru 12345QAZ!2021

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        try {
            await signUp(data);
            history.push("/createNewDataTable");
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
        boxShadow: "1px 1px 14px #ff9494"
    };
    return (
        <>
            {/* {isAdmin ? (
                <AdminPage
                    isAdmin={isAdmin}
                    users={docData}
                    executor={executor}
                />
            ) : */}
            (
            <div className="d-flex flex-column-reverse align-items-center m-4">
                <form
                    style={{ width: "15%" }}
                    onSubmit={handleSubmit}
                    className="d-flex flex-column align-items-center p-4 mt-5"
                >
                    {errorMessage && (
                        <p className="text-danger">{errorMessage}</p>
                    )}
                    <FormField
                        // className="d-flex flex-column align-items-center p-4 mt-5"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                        styleInput={inputstyle}
                        nameLabel={"Логин"}
                        description={"введите логин"}
                    />
                    <FormField
                        name="password"
                        value={data.password}
                        onChange={handleChange}
                        styleInput={inputstyle}
                        nameLabel={"Пароль"}
                        description={"введите пароль"}
                    />
                    <button
                        style={{
                            border: "none",
                            boxShadow: "0px 0px 34px #ff9494"
                        }}
                        className="btn btn-outline-secondary mt-4 d-md-flex justify-content-md-center"
                        type="submit"
                        disabled={!isValid || errorMessage}
                    >
                        ввести данные
                    </button>
                </form>
            </div>
            ){/* } */}
        </>
    );
};
export default Login;
