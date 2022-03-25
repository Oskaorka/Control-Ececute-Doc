import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import NavProfile from "./layout/ui/navProfile";
const NavBar = () => {
    const { currentUser } = useAuth();
    const styleLink = {
        color: "black",
        opacity: "0.6",
        fontSize: "1.5em",
        fontWeight: "bold",
        textShadow: "1px 0px 15px #d1cbcb, 0px 0px 40px white",
        textDecoration: "none"
    };
    const arraysLinks = [
        { link: "/", description: "Главная страница" },
        { link: "/information", description: "Информация" },
        // { link: "/informa", description: "Инфо" },
        { link: "/login", description: "Логин" }
    ];
    return (
        <nav className="navbar">
            <div className="container-fluid  m-4 bg-secondary bg-gradien bg-opacity-10 p-4 shadow">
                <ul
                    className="d-flex justify-content-between m-0"
                    style={{ width: "90%" }}
                >
                    {arraysLinks.map((link) => (
                        <li
                            key={link.description}
                            style={{ listStyle: "none" }}
                        >
                            {" "}
                            {link.link === "/login" && currentUser ? (
                                <NavProfile />
                            ) : (
                                <Link style={styleLink} to={link.link}>
                                    {link.description}
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>
                {/* <div className="d-flex"> */}

                {/* </div> */}
            </div>
        </nav>
    );
};

export default NavBar;
