import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false;
        this._user = {};
        makeAutoObservable(this);

    }

    setIsAuth(bool) {
        this._isAuth = bool;
    }

    setUser(user) {
        this._user = user;
    }

    get isAuth() {
        return this._isAuth
    }

    getUser() {
        return this._user
    }

    get userRole() {
        return this._user.role
    }
    setUserRole(role) {
        this._user.role = role;
    }
}