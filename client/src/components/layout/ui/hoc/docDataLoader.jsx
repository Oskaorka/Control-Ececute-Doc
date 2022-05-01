import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import {
    getDocDataLoadingStatus,
    loadDocDataList
} from "../../../store/docData";

const DocDataLoader = ({ children }) => {
    const docDataStatus = useSelector(getDocDataLoadingStatus());
    const dispatch = useDispatch();
    useEffect(() => {
        if (!docDataStatus) dispatch(loadDocDataList());
    }, []);
    if (docDataStatus) return "Zagr DocData";
    return children;
};
DocDataLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
export default DocDataLoader;
