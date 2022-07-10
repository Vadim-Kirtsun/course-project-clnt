import React, {createContext, useEffect, useState} from "react";
import {BrowserRouter} from "react-router-dom";
import './App.css';
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar"
import {check} from "./http/userApi";
import {Spin} from "antd";

export const ThemeContext = createContext(null);
export const UserContext = createContext(null);

const App = () => {
    const [loading, setLoading] = useState(true);
    const [theme, setTheme] = useState("light");
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        let componentMounted = true;
        if(currentUser.id !== undefined) {
            check().then(data => {

                if (componentMounted) {
                setCurrentUser({id: data.id, role: data.role, isAuth: true});
                console.log(currentUser);
            }}).finally(() => setLoading(false))
        }else{
            setLoading(false);
        }

        return () => {
            componentMounted = false;
        }
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
};

export default App;
