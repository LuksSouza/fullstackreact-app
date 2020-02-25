import React, { Component } from 'react';

import TodoDataService from '../../../api/TodoDataService.js';
import AuthenticationService from '../service/authentication/AuthenticationService.js';

class ListTodoComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            todos: [],
            message: null
        };

        this.updateTodoClicked = this.updateTodoClicked.bind(this);
        this.deleteTodoClicked = this.deleteTodoClicked.bind(this);
        this.refreshTodoList = this.refreshTodoList.bind(this);
    }

    /* componentWillUnmount() {
        console.log('componentWillUnmount');
    } */

    componentDidMount() {
        this.refreshTodoList();
    }

    refreshTodoList() {
        let username = AuthenticationService.getUserLoggedIn();

        TodoDataService.getAllTodos(username)
        .then(
            response => { 
                this.setState({todos : response.data}); 
            }
        );
    }

    deleteTodoClicked(id) {
        let username = AuthenticationService.getUserLoggedIn();

        TodoDataService.deleteTodoBy(username, id)
        .then( response => {
            this.setState({message : `Delete of todo ${id} successful`})
            this.refreshTodoList();
        })
        .catch( response => {
            this.setState({message : `An error has occured while trying to delete todo ${id}`})
        });
    }

    updateTodoClicked(id) {
        console.log("Updating todo " + id);
    }

    render() {
        return (
            <div>
                <h1>Todo List</h1>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Is Completed?</th>
                                <th>Target Date</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.todos.map ( 
                                todo => 
                                <tr key={todo.id}>
                                    <th>{todo.description}</th>
                                    <th>{todo.done.toString()}</th>
                                    <th>{todo.targetDate.toString()}</th>
                                    <th><button className="btn btn-success" onClick={() => this.updateTodoClicked(todo.id)}>Update</button></th>
                                    <th><button className="btn btn-warning" onClick={() => this.deleteTodoClicked(todo.id)}>Delete</button></th>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

}

export default ListTodoComponent;