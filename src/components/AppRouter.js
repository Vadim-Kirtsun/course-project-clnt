import React, {useContext} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {authRoutes, publicRoutes} from "../router";
import {Context} from "../index";
import {observer} from "mobx-react-lite";


const AppRouter = observer(() => {
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
});

export default AppRouter;