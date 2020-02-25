import React, { Component } from 'react';

class Todo extends Component {

    render() {
        return (
            <div className="container">We're gonna update the todo {this.props.match.params.id}</div>
        );
    }

}

export default Todo;