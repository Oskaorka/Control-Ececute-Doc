import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { toast } from "react-toastify";
import { setTokens } from "../service/localStorageService";
import docDataService from "../service/docService";
const httpAuth = axios.create();
const AddDataDocContext = React.createContext();

export const useAddData = () => {
    return useContext(AddDataDocContext);
};
const AddDataProvider = ({ children }) => {
    const [currentUser, setUser] = useState({});
    // const [isAdmin, setIsAdmin] = useState(false);
    const [error, setError] = useState(null);

    async function signUp({ email, password, ...rest }) {
        const keyFireBasePrivet = "AIzaSyBkGYFQ2v_cjCjL5K3IoGiREn2qOZXAsnk";
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${keyFireBasePrivet}`;
        try {
            const { data } = await httpAuth.post(url, {
                email,
                password,
                returnSecureToken: true
            });
            console.log(data);
            setTokens(data);
            await createUser({ _id: data.localId, email, ...rest });
            // setIsAdmin(true);
            console.log(data);
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            console.log(code, message);
            // console.log("false");
            // setIsAdmin(false);
            if (code === 400) {
                console.log("error");
                // if (message === "INVALID_EMAIL") {
                //     throw new Error("пользователь с таким Email не существует");
                // }
                // if (message === "INVALID_PASSWORD") {
                //     throw new Error("Пароль введен некорректно");
                // }
            }
        }
    }
    async function createUser(data) {
        try {
            const { content } = docDataService.create(data);
            setUser(content);
            console.log(content);
        } catch (error) {
            errorCatcher(error);
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
        <AddDataDocContext.Provider value={{ signUp, currentUser }}>
            {children}
        </AddDataDocContext.Provider>
    );
};
AddDataProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
export default AddDataProvider;
