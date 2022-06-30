import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import {Button, Switch} from 'antd';
import {Context} from "../index";
import {useNavigate} from "react-router-dom";
import {ADMIN_ROUTER, COLLECTION_ROUTER, LOGIN_ROUTER, MY_COLLECTIONS_ROUTER} from "../utils/consts";
import {ThemeContext, UserContext} from "../App";


const NavBar = () => {
    const {user} = useContext(Context);
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const {theme, toggleTheme} = useContext(ThemeContext);
    console.log(user.userRole);
    const navigate = useNavigate();

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
        setCurrentUser({isAuth: false})
        localStorage.removeItem('token');
        navigate(COLLECTION_ROUTER, { replace: true })
    }

    return (
        <div className='navbar'>
            <Switch checkedChildren={theme} unCheckedChildren={theme} defaultChecked onChange={toggleTheme}/>
            <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>

            {currentUser.isAuth
                ?
                <nav>
                    <div>
                    {(currentUser.role === "ADMIN")
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