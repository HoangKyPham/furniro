import React, { ReactElement } from 'react'
import { Navigate, Outlet } from 'react-router-dom';

interface Props {
    children: ReactElement;
}

const PrivateRoute = ({ children }: Props) => {
    const userData = localStorage.getItem('user');
    if (!userData) {
        return <Navigate to="/" />;
    }

    const user = JSON.parse(userData);
    if (user.user && user.user.role !== "admin") {
        alert("Bạn không có quyền truy cập");
        return <Navigate to="/" />;
    }

    // Nếu user có quyền admin, cho phép truy cập
    return children ? children : <Outlet />;
};


export default PrivateRoute