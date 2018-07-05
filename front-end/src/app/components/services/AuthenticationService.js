import Connection from "../../connections/Connection";

class AuthenticationService {
    // Initializing important variables
    constructor() {
        this.login = this.login.bind(this)
    }

    login(username, password) {
        // Get a token from api server using the fetch api
        return Connection.post('/login',{
            "username":username,
            "password":password
        }).then(res =>{
            //login successful
            this.setToken(JSON.stringify(res));

        });
    }

    loggedIn() {
        return this.getToken()
    }

    setToken(idToken) {
        // Saves user token to localStorage
        localStorage.setItem('id_token', idToken)
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token')
    }

    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
    }

}

export default AuthenticationService;