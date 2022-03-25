import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { toast } from "react-toastify";
import localStorageService, { setTokens } from "../service/localStorageService";
import userService from "../service/userService";
import { useHistory } from "react-router-dom";
import configFile from "../../configFile.json";

const httpAuth = axios.create({
    baseURL: configFile.apiPath + "/auth/"
});
const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};
const AuthProvider = ({ children }) => {
    const [error, setError] = useState(null);
    const [currentUser, setUser] = useState();
    const [isLoading, setLoading] = useState(true);
    const [allUserAdmin, setAllUserAdmin] = useState();
    const history = useHistory();
    useEffect(() => {
        getAdminData();
    }, []);

    async function signUp({ email, password, ...rest }) {
        const url = `signUp`;
        try {
            const { data } = await httpAuth.post(url, {
                email,
                password,
                ...rest
            });
            setTokens(data);
            await createUser({
                _id: data.userId,
                email,
                ...rest
            });
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            if (code === 400) {
                if (message === "INVALID_EMAIL") {
                    throw new Error("пользователь с таким Email не существует");
                }
                if (message === "INVALID_PASSWORD") {
                    throw new Error("Пароль введен некорректно");
                }
            }
        }
    }
    async function signUpAdmin({ email, password, ...rest }) {
        const url = `signUp`;
        try {
            const { data } = await httpAuth.post(url, {
                email,
                password,
                ...rest
            });
            setTokens(data);
            await createAdmin({
                _id: data.userId,
                email,
                ...rest
            });
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            if (code === 400) {
                if (message === "INVALID_EMAIL") {
                    throw new Error("пользователь с таким Email не существует");
                }
                if (message === "INVALID_PASSWORD") {
                    throw new Error("Пароль введен некорректно");
                }
            }
        }
    }
    async function signInAdmin({ email, password, formType }) {
        const url = `signInWithPassword`;
        try {
            const { data } = await httpAuth.post(url, {
                email,
                password,
                formType
            });
            setTokens(data);
            await getAdminData();
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            if (code === 400) {
                if (message === "INVALID_EMAIL") {
                    throw new Error("пользователь с таким Email не существует");
                }
                if (message === "INVALID_PASSWORD") {
                    throw new Error("Пароль введен некорректно");
                }
            }
        }
    }
    async function signIn({ email, password, formType }) {
        const url = `signInWithPassword`;
        try {
            const { data } = await httpAuth.post(url, {
                email,
                password,
                formType
            });
            setTokens(data);
            await getUserData();
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            if (code === 400) {
                if (message === "INVALID_EMAIL") {
                    throw new Error("пользователь с таким Email не существует");
                }
                if (message === "INVALID_PASSWORD") {
                    throw new Error("Пароль введен некорректно");
                }
            }
        }
    }
    function logOut() {
        localStorageService.removeAuthData();
        setUser(null);
        history.push("/login");
    }
    async function createUser(data) {
        try {
            const { content } = await userService.create(data);
            setUser(content);
        } catch (error) {
            errorCatcher(error);
        }
    }
    async function createAdmin(data) {
        try {
            const { content } = await userService.createAdmin(data);
            setUser(content);
        } catch (error) {
            errorCatcher(error);
        }
    }
    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }
    async function getUserData() {
        try {
            const { content } = await userService.getCurrentUser();
            const admin = content.find(
                (item) => item._id === localStorageService.getUserId()
            );
            setUser(admin);
        } catch (error) {
            errorCatcher(error);
        } finally {
            setLoading(false);
        }
    }
    async function getAdminData() {
        try {
            const { content } = await userService.getCurrentAdmin();
            const admin = await content.find(
                (item) => item._id === localStorageService.getUserId()
            );
            setAllUserAdmin(content);
            setUser(admin);
        } catch (error) {
            errorCatcher(error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        if (localStorageService.getAccessToken()) {
            if (allUserAdmin !== undefined) {
                // console.log(allUserAdmin);
                const admin = allUserAdmin.find(
                    (item) => item._id === localStorageService.getUserId()
                );
                setUser(admin);
                // console.log(admin);
            }
            // console.log("+");
            getUserData();
            getAdminData();
        } else {
            setLoading(false);
        }
    }, []);
    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);
    // console.log(currentUser);
    return (
        <AuthContext.Provider
            value={{
                signIn,
                signUp,
                currentUser,
                logOut,
                signInAdmin,
                signUpAdmin
            }}
        >
            {!isLoading ? children : "Идет загрузка"}
        </AuthContext.Provider>
    );
};
AuthProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
export default AuthProvider;
