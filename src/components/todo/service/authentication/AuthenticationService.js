import axios from 'axios';
import { API_URL } from '../../../../api/Constants';

const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';

class AuthenticationService {

    getBasicAuth(username, password) {
        return axios.get(`${API_URL}/basicauth`, {
            headers: { authorization: this.createBasicAuthToken(username, password) }
        });
    }

    getJTWAuth(username, password) {
        const user = {
            username: username,
            password: password
        }

        return axios.post(`${API_URL}/authenticate`, user);
    }

    registerSuccessfulLogin(username, password) {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
        this.setupAxiosInterceptors(this.createBasicAuthToken(username, password));
    }

    registerSuccessfulLoginWithJWT(username, token) {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
        this.setupAxiosInterceptors(this.createJWTAuthToken(token));
    }

    clearUserLogedIn() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);

        if (user === null) return false;

        return true;
    }

    getUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);

        if (user === null) return '';

        return user;
    }

    createJWTAuthToken(token) {
        return `Bearer ${token}`;
    }

    createBasicAuthToken(username, password) {
        let authEncrypted = window.btoa(`${username}:${password}`);
        let basicAuthToken = `Basic ${authEncrypted}`;

        return basicAuthToken;
    }

    setupAxiosInterceptors(token) {
        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.authorization = token;
                }
                return config;
            }
        )
    }

}

export default new AuthenticationService();