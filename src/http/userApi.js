import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (name,email, password) => {
    const {data} = await $host.post('api/user/registration', {name, email, password, role: 'Admin'});
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
};

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password});
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
};

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth');
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
};

export const getUsers = async () => {
    const {data} = await $authHost.get('api/user/getUsers');
    console.log(data)
    return data;
};

export const blockUser = async (selectedIds) => {
    const {data} = await $host.put('api/user/blockUser', selectedIds);
    console.log(data)
    return data;
};

export const unblockUser = async (selectedIds) => {
    const {data} = await $host.put('api/user/unblockUser', selectedIds);
    console.log(data)
    return data;
};

export const deleteUser = async (selectedIds) => {
    const {data} = await $host.put('api/user/deleteUser', selectedIds);
    console.log(data)
    return data;
};

export const changeRoleUser = async (id, role) => {
    const {data} = await $host.put('api/user/changeRole', {id, role});
    console.log(data)
    return data;
};