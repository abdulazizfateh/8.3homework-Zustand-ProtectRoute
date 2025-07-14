import React from 'react'
import { useStore } from '../zustand/store';
import { Navigate, Outlet } from 'react-router-dom';

const Auth = () => {
    const { token } = useStore();
    return !token ? <Navigate replace to={"/sign-in"} /> : <Outlet />
}

export default React.memo(Auth);