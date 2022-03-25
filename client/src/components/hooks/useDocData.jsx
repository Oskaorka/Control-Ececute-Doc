import React, { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import docDataService from "../service/docService";
import PropTypes from "prop-types";
import sortData from "../utils/sortData";

const DocDataContext = React.createContext();

export const useDocData = () => {
    return useContext(DocDataContext);
};

export const DocDataProvider = ({ children }) => {
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [docData, setDocData] = useState([]);
    useEffect(() => {
        getData();
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
    async function getData() {
        try {
            const { content } = await docDataService.get();
            const sortContent = sortData(content);
            setDocData(sortContent);
            setLoading(true);
        } catch (error) {
            errorCatcher(error);
        }
    }
    return (
        <DocDataContext.Provider value={{ docData, isLoading, getData }}>
            {isLoading ? children : "loading data"}
        </DocDataContext.Provider>
    );
};
DocDataProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
