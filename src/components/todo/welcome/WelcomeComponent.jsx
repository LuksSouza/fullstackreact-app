import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class WelcomeComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div>
                    <h1>Welcome</h1>
                    <div className="container">Welcome to Todo App {this.props.match.params.name}.
                    You can manage the todo list <Link to="/todos">here</Link></div>
                </div>
            </div>
        );
    }

}

export default WelcomeComponent;