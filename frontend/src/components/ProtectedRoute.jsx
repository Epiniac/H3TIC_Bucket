import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/Auth";

const ProtectedRoute = ({ element }) => {
    return isAuthenticated() ? element : <Navigate to="/" replace />;
};
ProtectedRoute.propTypes = {
    element: PropTypes.element.isRequired,
};

export default ProtectedRoute;
