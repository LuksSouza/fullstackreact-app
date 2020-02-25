import React, { Component } from 'react';
import CounterButton from './button/CounterButton';
import './Counter.css';

class Counter extends Component {

    constructor() {
        super();

        this.state = {
            counter: 0
        };

        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        this.reset = this.reset.bind(this);
    }

    render() {
        return (
            <div className="counter">
                <CounterButton incrementMethod={this.increment} decrementMethod={this.decrement} />
                <CounterButton by={5} incrementMethod={this.increment} decrementMethod={this.decrement} />
                <CounterButton by={10} incrementMethod={this.increment}  decrementMethod={this.decrement} />
                <span className="count">{this.state.counter}</span>
                <br></br>
                <button className="reset" onClick={this.reset}>Reset</button>
            </div>
        );
    }

    increment(by) {
        this.setState({
            counter: this.state.counter + by
        });
    }

    decrement(by) {
        this.setState({
            counter: this.state.counter - by
        });
    }

    reset() {
        this.setState({
            counter: 0
        });
    }
    
}

export default Counter;