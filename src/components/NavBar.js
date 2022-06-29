import React, {useContext, useLayoutEffect, useState} from 'react';
import { Button } from 'antd';
import {Context} from "../index";
import {useNavigate} from "react-router-dom";
import {ADMIN_ROUTER, COLLECTION_ROUTER, LOGIN_ROUTER, MY_COLLECTIONS_ROUTER} from "../utils/consts";


const NavBar = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const {user} = useContext(Context);
    console.log(user.userRole);
    const navigate = useNavigate();

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
        localStorage.removeItem('token');
        navigate(COLLECTION_ROUTER, { replace: true })
    }

    useLayoutEffect(() => {
        debugger
        if(user.userRole === "ADMIN") {
            setIsAdmin(true);
        }
        if(user.userRole === undefined) {
            setIsAdmin(false);
        }
    }, [user.isAuth,user.userRole]);

    return (
        <div className='navbar'>
            <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
            {user.isAuth
                ?
                <nav>
                    <div>
                    {isAdmin
                        ?
                        <Button
                            type="primary" danger ghost
                            onClick={() => navigate(ADMIN_ROUTER, { replace: true })}
                        >
                            Admin panel
                        </Button> : <div></div>
                    }
                        <Button
                            type="primary" danger ghost
                            onClick={() => navigate(MY_COLLECTIONS_ROUTER, { replace: true })}
                        >
                            My Collections
                        </Button>
                    <Button
                        type="primary" danger ghost
                        onClick={() =>logOut()}
                    >
                        Выйти
                    </Button>
                    </div>

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