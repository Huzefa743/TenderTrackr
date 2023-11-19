import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { AuthContext } from '../App';

function PrivateRoutes() {

    const userName = localStorage.getItem("username");
    const Auth = localStorage.getItem("auth");

    const loggedInUser = { userName, Auth }

    return (
        <div>
            <AuthContext.Provider value={loggedInUser}>
                {userName ? <Outlet /> : <Navigate to="/" />}
            </AuthContext.Provider>
        </div>
    )
}

export default PrivateRoutes