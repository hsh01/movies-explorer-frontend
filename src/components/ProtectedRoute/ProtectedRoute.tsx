import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { PublicRouter } from "../../utils/routes";

type ProtectedRouteProps = {
    children: JSX.Element;
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children}) => {
    const {user} = useAuth();
    const location = useLocation();

    if (!user) {
        return <Navigate to={PublicRouter.MAIN} state={{from: location}} replace />;
    }

    return children;
};


export { ProtectedRoute };
