import React, {useContext, useState} from 'react';
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {HOME_ROUTER, LOGIN_ROUTER, REGISTRATION_ROUTER,} from "../utils/consts";
import {login, registration} from "../http/userApi";
import {UserContext} from "../App";
import {Button, Col, Form, Input, Row} from "antd";

const Auth = () => {
    const {setCurrentUser} = useContext(UserContext);
    const location = useLocation();
    const navigate = useNavigate();
    const isLogin = location.pathname === LOGIN_ROUTER;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(name, email, password);
            }
            setCurrentUser({id: data.id, role: data.role});
            navigate(HOME_ROUTER, {replace: true});
        } catch (e) {
            console.log(e);
        }
    }
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="login">
            <h2>{isLogin ? "Log In" : "Register"}</h2>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input value={name}
                           onChange={(e) => setName(e.target.value)}/>
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input value={email}
                           onChange={(e) => setEmail(e.target.value)}/>
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password value={password}
                                    onChange={(e) => setPassword(e.target.value)}/>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    {/*<Button type="primary" htmlType="submit">
                        Submit
                    </Button>*/}
                   {isLogin
                        ?
                        <Row>
                            <Col span={22}>
                            <NavLink to={REGISTRATION_ROUTER}>Register</NavLink>
                            </Col>
                            <Col span={2}>
                                <Button
                                    variant="outline-success"
                                    onClick={click}
                                >
                                    Log In
                                </Button>
                            </Col>
                        </Row>
                        : <Row>
                           <Col span={21}>
                            <NavLink to={LOGIN_ROUTER}>Log In</NavLink>
                           </Col>
                           <Col span={2}>
                            <Button
                                variant="outline-success"
                                onClick={click}
                            >
                                Register
                            </Button>
                           </Col>
                        </Row>
                    }

            </Form.Item>
        </Form>
</div>
);
};

export default Auth;