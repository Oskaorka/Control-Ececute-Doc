import React, { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import executorService from "../service/executorService";
const ExecutorContext = React.createContext();

export const useExecutor = () => {
    return useContext(ExecutorContext);
};

export const ExecutorProvider = ({ children }) => {
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [executor, setExecutor] = useState();
    useEffect(() => {
        getExecutor();
    }, []);
    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);
    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
        setLoading(false);
    }
    async function getExecutor() {
        try {
            const { content } = await executorService.get();
            setExecutor(content);
            setLoading(true);
        } catch (error) {
            errorCatcher(error);
        }
    }
    return (
        <ExecutorContext.Provider value={{ isLoading, executor }}>
            { isLoading ? children : "loading..." }
        </ExecutorContext.Provider>
    );
};
ExecutorProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
