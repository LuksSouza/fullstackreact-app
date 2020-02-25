import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import LoginComponent from './login/LoginComponent';
import WelcomeComponent from './welcome/WelcomeComponent';
import ErrorPageComponent from './errorPage/ErrorPageComponent';
import ListTodoComponent from './listTodo/ListTodoComponent';
import HeaderComponent from './defaultPage/HeaderComponent';
import FooterComponent from './defaultPage/FooterComponent';
import LogoutComponent from './logout/LogoutComponent';
import AuthenticatedRoute from './service/authentication/AuthenticatedRoute';
import Todo from './todo/TodoComponent';

class TodoApp extends Component {

    render() {
        return (
            <div className="todoApp">
                <Router>
                    <HeaderComponent />
                    <Switch>
                        <Route path="/" exact component={LoginComponent} />
                        <Route path="/login" component={LoginComponent} />
                        <AuthenticatedRoute path="/logout" component={LogoutComponent} />
                        <AuthenticatedRoute path="/welcome/:name" component={WelcomeComponent} />
                        <AuthenticatedRoute path="/todo/:id" component={Todo} />
                        <AuthenticatedRoute path="/todos" component={ListTodoComponent} />
                        <Route component={ErrorPageComponent} />
                    </Switch>
                    <FooterComponent />
                </Router>
            </div>
        );
    }

}

export default TodoApp;