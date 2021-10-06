import React from "react";
import { Link } from "react-router-dom";
const NavBar = () => {
  const styleLink = {
    color: "white",
    fontSize: "1.5em",
    fontWeight: "bold",
    textShadow: "1px 0px 15px tomato, 0px 0px 40px white",
    textDecoration: "none",
  };
  const arraysLinks = [
    { link: "/", description: "Главная страница" },
    { link: "/information", description: "Информация" },
    { link: "/login", description: "Авторизация" },
  ];
  return (
    <>
      <ul className="d-flex justify-content-around m-4 bg-secondary bg-gradien bg-opacity-10 p-4 shadow">
        {arraysLinks.map((link) => (
          <li style={{ listStyle: "none" }}>
            <Link key={link.description} style={styleLink} to={link.link}>
              {link.description}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default NavBar;
