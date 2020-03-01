import axios from 'axios';

class AuthenticationService {

    getBasicAuth(username, password) {
        return axios.get('http://localhost:8080/basicauth', {
            headers: {authorization: this.createBasicAuthToken(username, password)}
        });
    }

    registerSuccessfulLogin(username, password) {
        sessionStorage.setItem('authenticatedUser', username);
        this.setupAxiosInterceptors(this.createBasicAuthToken(username, password));
    }

    clearUserLogedIn() {
        sessionStorage.removeItem('authenticatedUser');
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem('authenticatedUser');

        if (user === null) return false;

        return true;
    }

    getUserLoggedIn() {
        let user = sessionStorage.getItem('authenticatedUser');

        if (user === null) return '';

        return user;
    }

    createBasicAuthToken(username, password) {
        let authEncrypted = window.btoa(`${username}:${password}`);
        let basicAuthToken = `Basic ${authEncrypted}`;

        return basicAuthToken;
    }

    setupAxiosInterceptors(basicAuthToken) {
        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.authorization = basicAuthToken;
                }
                return config;
            }
        )
    }

}

export default new AuthenticationService();