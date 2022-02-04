import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { toast } from "react-toastify";
import { setTokens } from "../service/localStorageService";
const httpAuth = axios.create();
const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};
const AuthProvider = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [error, setError] = useState(null);

    async function signUp({ email, password }) {
        const keyFireBasePrivet = "AIzaSyBkGYFQ2v_cjCjL5K3IoGiREn2qOZXAsnk";
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${keyFireBasePrivet}`;
        try {
            const { data } = await httpAuth.post(url, {
                email,
                password,
                returnSecureToken: true
            });
            setTokens(data);
            setIsAdmin(true);
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            console.log(code, message);
            console.log("false");
            setIsAdmin(false);
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
    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }
    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);
    return (
        <AuthContext.Provider value={{ signUp, isAdmin }}>
            {children}
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
