import React, { Component } from 'react';
import AuthenticationService from '../service/authentication/AuthenticationService';

class LoginComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: 'Lucas',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.loginClicked = this.loginClicked.bind(this);
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <div className="container">
                    {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                    Login: <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                    Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                    <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
                </div>
            </div>
        );
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    loginClicked() {
        if (this.state.username === 'Lucas' && this.state.password === 'dummy') {
            AuthenticationService.registerSuccessfulLogin(this.state.username);
            this.props.history.push(`/welcome/${this.state.username}`);
        } else {
            this.setState({hasLoginFailed: true});
            this.setState({showSuccessMessage: false});
        }
    }

}

export default LoginComponent;