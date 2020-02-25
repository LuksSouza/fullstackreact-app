import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import HelloWorldService from '../../../api/HelloWorldService.js';

class WelcomeComponent extends Component {

    constructor(props) {
        super(props);

        this.getHelloWorld = this.getHelloWorld.bind(this);
    }

    render() {
        return (
            <div>
                <div>
                    <h1>Welcome</h1>
                    <div className="container">Welcome to Todo App {this.props.match.params.name}.
                    You can manage the todo list <Link to="/todos">here</Link></div>
                </div>
                <div className="container">
                    Get a costumized welcome message clicking <button onClick={this.getHelloWorld} className="btn btn-success">here</button>
                </div>
            </div>
        );
    }

    getHelloWorld() {
        HelloWorldService.executeHelloWorldService()
        .then( responde => console.log(responde) );
    }

}

export default WelcomeComponent;