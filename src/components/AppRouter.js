import React, {useContext} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {authRoutes, publicRoutes} from "../router";
import {Context} from "../index";


const AppRouter = () => {
    const {user} = useContext(Context)

    return (
        user.isAuth
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
                    element={<Navigate to="/admin" replace />}
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
                    element={<Navigate to="/collections" replace />}
                    />
                </Routes>
    );
};

export default AppRouter;