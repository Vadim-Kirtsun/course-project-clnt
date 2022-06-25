import React, {useContext, useEffect, useState} from "react";
import {BrowserRouter} from "react-router-dom";
import './App.css';
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar"
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check} from "./http/userApi";
import {Spin} from "antd";


const App = observer(() => {
    const  {user} = useContext(Context);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        check().then(data => {
            user.setUser(data);
            user.setIsAuth(true);
            console.log(data);
        }).finally(() => setLoading(false))
    }, [user])

    if (loading) {
        return <Spin size="large" />
    }

  return (
    <BrowserRouter>
        <NavBar />
        <AppRouter />
    </BrowserRouter>
  );
});

export default App;
