import React, {createContext, useContext, useEffect, useState} from "react";
import {BrowserRouter} from "react-router-dom";
import './App.css';
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar"
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check} from "./http/userApi";
import {Spin} from "antd";

export const ThemeContext = createContext(null);
export const UserContext = createContext(null);

const App = observer(() => {
    const {user} = useContext(Context);
    const [loading, setLoading] = useState(true);
    const [theme, setTheme] = useState("light");
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        check().then(data => {
            user.setUser(data);
            user.setIsAuth(true);
            console.log(data);
        }).finally(() => setLoading(false))
    }, [user])

    useEffect(() => {
        check().then(data => {
            setCurrentUser({id:data.id, role:data.role, isAuth: true});
            console.log(currentUser);
        }).finally(() => setLoading(false))
    }, [currentUser.id])

    if (loading) {
        return <Spin size="large"/>
    }

    const toggleTheme = () => {
        setTheme((curr) => (curr === "light" ? "dark" : "light"));
    }

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            <UserContext.Provider value={{currentUser, setCurrentUser}}>
                <div className="App" id={theme}>
                    <BrowserRouter>
                        <NavBar/>
                        <AppRouter/>
                    </BrowserRouter>
                </div>
            </UserContext.Provider>
        </ThemeContext.Provider>
    );
});

export default App;
