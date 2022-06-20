import React, {useContext} from 'react';
import { Button } from 'antd';
import {Context} from "../index";
import {useNavigate} from "react-router-dom";
import {ADMIN_ROUTER, HOME, LOGIN_ROUTER, MY_COLLECTIONS_ROUTER} from "../utils/consts";


const NavBar = () => {
    const {user} = useContext(Context);
    const currentUserRole = user.getUser().role;
    const navigate = useNavigate();

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
        localStorage.removeItem('token');
        navigate(HOME, { replace: true })
    }


    return (
        <div className='navbar'>
            <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
            {user.isAuth
                ?
                <nav className="ml-auto m-2">

                    <Button onClick={() => navigate(MY_COLLECTIONS_ROUTER, { replace: true })}>My Collections</Button>
                    {currentUserRole === "USER"?
                    <button
                        className="btn btn-outline-dark"
                        type="submit"
                        onClick={() => navigate(ADMIN_ROUTER, { replace: true })}
                    >
                        Админ панель
                    </button>
                        : <div></div>
                    }
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
    )
};

export default NavBar;