import React, { useState } from "react";
import FormField from "../formField";
import AdminPage from "../../adminPage";

const Login = ({ isAdmin, toggleBool }) => {
  const [data, setData] = useState({ login: "", password: "" });
  const mainPass = [
    // { login: "RosgvardBoss", password: "0016reg51" },
    // { login: "RosgvardBoss", password: "001reg51" },
    // { login: "RosgvardBoss", password: "0010reg51" },
    // { login: "2", password: "1" },
    // { login: "21", password: "11" },
    { login: "1", password: "1" },
  ];
  const handleChange = ({ target }) => {
    setData((prevstate) => ({
      ...prevstate,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mainPass.map((e) => {
      e.login === data.login && e.password === data.password
        ? toggleBool(true)
        : toggleBool(false);
    });
  };

  const inputstyle = {
    textAlign: "center",
    padding: "8px",
    borderRadius: "12px",
    border: "none",
    outline: "none",
    boxShadow: "1px 1px 14px #ff9494",
  };
  return (
    <>
      {isAdmin ? (
        <AdminPage isAdmin={isAdmin} />
      ) : (
        <div className="d-flex flex-column-reverse align-items-center m-4">
          <form
            style={{ width: "15%" }}
            onSubmit={handleSubmit}
            className="d-flex flex-column align-items-center p-4 mt-5"
          >
            <FormField
              // className="d-flex flex-column align-items-center p-4 mt-5"
              name="login"
              value={data.login}
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
              style={{ border: "none", boxShadow: "0px 0px 34px #ff9494" }}
              className="btn btn-outline-secondary mt-4 d-md-flex justify-content-md-center"
              type="submit"
            >
              ввести данные
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
