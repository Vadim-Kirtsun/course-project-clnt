import React, {useContext, useEffect, useState} from 'react';
import { Button } from 'antd';
import {Context} from "../index";
import {useNavigate} from "react-router-dom";
import {ADMIN_ROUTER, COLLECTION_ROUTER, LOGIN_ROUTER, MY_COLLECTIONS_ROUTER} from "../utils/consts";
import {getUsers} from "../http/userApi";


const NavBar = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const {user} = useContext(Context);
    console.log(user.getUser().role);
    const navigate = useNavigate();

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
        localStorage.removeItem('token');
        navigate(COLLECTION_ROUTER, { replace: true })
    }

    useEffect(() => {
        console.log('hello')
         let currentRole = user.getUser().role;
        if(currentRole === "Admin") {
            setIsAdmin(true);
        }
    }, [user.isAuth]);


    return (
        <div className='navbar'>
            <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
            {user.isAuth
                ?
                <nav className="ml-auto m-2">
                    {isAdmin
                        ?
                        <Button
                            type="primary" danger ghost
                            onClick={() => navigate(ADMIN_ROUTER, { replace: true })}
                        >
                            Админ панель
                        </Button>
                        :
                        <Button
                            type="primary" danger ghost
                            onClick={() => navigate(MY_COLLECTIONS_ROUTER, { replace: true })}
                        >
                            My Collections
                        </Button>
                    }
                    <Button
                        type="primary" danger ghost
                        onClick={() =>logOut()}
                    >
                        Выйти
                    </Button>
                </nav>
                :
                <nav className="ml-auto m-2">
                    <Button
                        type="primary" danger ghost
                        onClick={() => navigate(LOGIN_ROUTER, { replace: true })}
                    >Авторизация</Button>
                </nav>
            }
        </div>
    )
};

export default NavBar;