import React, {useContext} from 'react';
import {Button, Switch} from 'antd';
import {useNavigate} from "react-router-dom";
import {ADMIN_ROUTER, COLLECTION_ROUTER, HOME_ROUTER, LOGIN_ROUTER, MY_COLLECTIONS_ROUTER} from "../utils/consts";
import {ThemeContext, UserContext} from "../App";


const NavBar = () => {
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const {theme, toggleTheme} = useContext(ThemeContext);
    const navigate = useNavigate();

    const logOut = () => {
        setCurrentUser({isAuth: false})
        localStorage.removeItem('token');
        navigate(COLLECTION_ROUTER, {replace: true})
    }

    return (
        <div className='navbar'>
            <Switch checkedChildren={theme} unCheckedChildren={theme} defaultChecked onChange={toggleTheme}/>

            {currentUser.isAuth
                ?
                <nav>
                    <Button
                        type="primary" danger ghost
                        onClick={() => navigate(HOME_ROUTER, {replace: true})}
                    >
                        Home
                    </Button>
                    {(currentUser.role === "ADMIN")
                        ?
                        <Button
                            type="primary" danger ghost
                            onClick={() => navigate(ADMIN_ROUTER, {replace: true})}
                        >
                            Admin panel
                        </Button> : <></>
                    }
                    <Button
                        type="primary" danger ghost
                        onClick={() => navigate(MY_COLLECTIONS_ROUTER, {replace: true})}
                    >
                        My Collections
                    </Button>

                    <Button
                        type="primary" danger ghost
                        onClick={() => navigate(COLLECTION_ROUTER, {replace: true})}
                    >
                        All Collections
                    </Button>
                    <Button
                        type="primary" danger ghost
                        onClick={() => logOut()}
                    >
                        Sign Out
                    </Button>

                </nav>
                :
                <nav className="ml-auto m-2">
                    <Button
                        type="primary" danger ghost
                        onClick={() => navigate(HOME_ROUTER, {replace: true})}
                    >
                        Home
                    </Button>
                    <Button
                        type="primary" danger ghost
                        onClick={() => navigate(COLLECTION_ROUTER, {replace: true})}
                    >
                        All Collections
                    </Button>
                    <Button
                        type="primary" danger ghost
                        onClick={() => navigate(LOGIN_ROUTER, {replace: true})}
                    >
                        Sign In
                    </Button>
                </nav>
            }
        </div>
    )
}
;

export default NavBar;