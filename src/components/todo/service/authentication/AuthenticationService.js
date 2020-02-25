class AuthenticationService {

    registerSuccessfulLogin(username, password) {
        sessionStorage.setItem('authenticatedUser', username);
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

}

export default new AuthenticationService();