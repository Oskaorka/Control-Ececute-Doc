import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminLoadimgStatus, loadAdminList } from "../../../store/admin";
import PropTypes from "prop-types";

const AdminsLoader = ({ children }) => {
    const adminStatus = useSelector(getAdminLoadimgStatus());
    const dispatch = useDispatch();

    useEffect(() => {
        if (!adminStatus) dispatch(loadAdminList());
    }, []);
    if (adminStatus) return "none admin";
    return children;
};
AdminsLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
export default AdminsLoader;
