import React from "react";
import PropTypes from "prop-types";
import FormField from "../formField";

const LoginFormUser = ({
    handleChange,
    handleSubmit,
    errorMessage,
    data,
    isValid,
    inputstyle
}) => {
    return (
        <>
            <form
                style={{ width: "20" }}
                onSubmit={handleSubmit}
                className="d-flex flex-column align-items-center p-4 mt-5"
            >
                {errorMessage && <p className="text-danger">{errorMessage}</p>}
                <FormField
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    styleInput={inputstyle}
                    nameLabel={"Логин пользователя"}
                    description={"введите логин"}
                    type="text"
                />
                <FormField
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    styleInput={inputstyle}
                    nameLabel={"Пароль"}
                    description={"введите пароль"}
                    type="text"
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

LoginFormUser.propTypes = {
    handleChange: PropTypes.func,
    handleSubmit: PropTypes.func,
    errorMessage: PropTypes.string,
    data: PropTypes.object,
    inputstyle: PropTypes.object,
    isValid: PropTypes.bool
};

export default LoginFormUser;
