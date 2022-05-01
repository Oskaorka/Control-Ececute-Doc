import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import {
    getExecutorLoadingStatus,
    loadExecutorList
} from "../../../store/executor";

const ExecutorsLoader = ({ children }) => {
    const executorStatus = useSelector(getExecutorLoadingStatus());
    const dispatch = useDispatch();
    useEffect(() => {
        if (!executorStatus) dispatch(loadExecutorList());
    }, []);
    if (executorStatus) return "загрузка исполнителей.......";
    return children;
};
ExecutorsLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
export default ExecutorsLoader;
