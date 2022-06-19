import React, {useContext} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import {ADMIN_ROUTER, LOGIN_ROUTER} from "../utils/consts";


const NavBar = observer(() => {
    const {user} = useContext(Context);
    const navigate = useNavigate()

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
        localStorage.removeItem('token');
    }

    return (
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                            <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                    {user.isAuth
                        ? <nav className="ml-auto m-2">
                            <button
                                className="btn btn-outline-dark"
                                type="submit"
                                onClick={() => navigate(ADMIN_ROUTER, { replace: true })}
                            >
                                Админ панель
                            </button>
                            <button
                                className="btn btn-outline-dark m-2"
                                type="submit"
                                onClick={() =>logOut()}
                            >
                                Выйти
                            </button>
                        </nav>
                        :
                        <nav className="ml-auto m-2">
                            <button
                                className="btn btn-outline-dark"
                                type="submit"
                                onClick={() => navigate(LOGIN_ROUTER, { replace: true })}
                            >Авторизация</button>
                        </nav>
                    }

                </div>
            </div>
        </nav>
                );
                });

export default NavBar;