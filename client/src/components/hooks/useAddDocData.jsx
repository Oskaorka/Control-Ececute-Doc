import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { toast } from "react-toastify";
import { setTokens } from "../service/localStorageService";
import docDataService from "../service/docService";
import configFile from "../../configFile.json";
const httpAuth = axios.create({
    baseURL: configFile.apiPath + "/auth/"
});
const AddDataDocContext = React.createContext();

export const useAddData = () => {
    return useContext(AddDataDocContext);
};
const AddDataProvider = ({ children }) => {
    const [currentUser, setUser] = useState({});
    // const [isAdmin, setIsAdmin] = useState(false);
    const [error, setError] = useState(null);

    async function signUpData({ nameExecutor, ...rest }) {
        const url = `signUpData`;
        try {
            const { data } = await httpAuth.post(url, {
                ...rest
            });
            setTokens(data);
            // console.log(nameExecutor);
            await createData({ _id: data.userId, nameExecutor, ...rest });
            // console.log(...rest);
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            console.log(code, message);
            if (code === 400) {
                console.log("error");
            }
        }
    }
    async function updateData({ ...rest }) {
        // console.log(rest);
        const url = `updateData`;
        try {
            const { data } = await httpAuth.post(url, {
                ...rest
            });
            setTokens(data);
            // console.log(data);
            // console.log(nameExecutor);
            // await createUser({ _id: data.userId, nameExecutor, ...rest });
            // console.log(...rest);
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            console.log(code, message);
            if (code === 400) {
                console.log("error");
            }
        }
    }

    // console.log(updateData);
    async function createData(data) {
        try {
            const content = await docDataService.update(data);
            setUser((prevState) => [...prevState, content]);
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
        <AddDataDocContext.Provider
            value={{ signUpData, currentUser, updateData }}
        >
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
