import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form, Row} from "react-bootstrap";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {COLLECTION_ROUTER, LOGIN_ROUTER, REGISTRATION_ROUTER,} from "../utils/consts";
import {login, registration} from "../http/userApi";
import {UserContext} from "../App";

const Auth = () => {
    const {setCurrentUser} = useContext(UserContext);
    const location = useLocation();
    const navigate = useNavigate();
    const isLogin = location.pathname === LOGIN_ROUTER;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const click = async () => {
        try{
            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(name, email, password);
            }
            setCurrentUser({id:data.id, role:data.role});
            navigate(COLLECTION_ROUTER, { replace: true });
        } catch (e) {
            alert('Something went wrong');
        }
    }

    return (
        <Container className="d-flex justify-content-center align-items-center h-100">
            <Card className="p-5 w-50 mt-5">
                <h2 className="m-auto">{isLogin ? "Авторизация" : "Регистрация"}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-2"
                        placeholder="Введите Ваше имя..."
                    />
                    <Form.Control
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-2"
                        placeholder="Введите Ваш email..."
                        />
                    <Form.Control
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-2"
                        placeholder="Введите Ваш password..."
                        type="password"
                    />
                    <Row>
                        {isLogin
                        ?   <div className="d-flex justify-content-lg-between mt-3 pl-3 pr-3">
                                <NavLink to={REGISTRATION_ROUTER}>Зарегистрироваться</NavLink>
                                <Button
                                    variant="outline-success"
                                    onClick={click}
                                >
                                    Войти
                                </Button>
                            </div>
                         :  <div className="d-flex justify-content-lg-between mt-3 pl-3 pr-3">
                                <NavLink to={LOGIN_ROUTER}>Войти</NavLink>
                                <Button
                                    variant="outline-success"
                                    onClick={click}
                                >
                                    Зарегистрироваться
                                </Button>
                            </div>
                        }

                    </Row>
                </Form>
            </Card>
        </Container>
    );
};

export default Auth;