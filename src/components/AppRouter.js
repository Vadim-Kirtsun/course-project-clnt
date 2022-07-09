import React, {useContext} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {authRoutes, publicRoutes} from "../router";
import {UserContext} from "../App";


const AppRouter = () => {
    const {currentUser} = useContext(UserContext);

    return (
        currentUser.isAuth
            ? <Routes>
                {authRoutes.map((router) =>
                    <Route
                        key={router.path}
                        path={router.path}
                        element={router.element}
                    />
                )}
                    <Route
                    path="*"
                    element={<Navigate to="/home" replace />}
                    />
                </Routes>

            : <Routes>
                {publicRoutes.map((router) =>
                    <Route
                        key={router.path}
                        path={router.path}
                        element={router.element}
                    />
                )}
                    <Route
                    path="*"
                    element={<Navigate to="/home" replace />}
                    />
                </Routes>
    );
};

export default AppRouter;