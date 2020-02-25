import React, { Component } from 'react';

class ResetButton extends Component {

    constructor() {
        super();

        this.reset = this.reset.bind(this);
    }

    render() {
        return (
            <div className="resetButton">
                <button onClick={this.reset}>Reset</button>
            </div>
        );
    }

    reset() {
        this.props.resetMethod();
    }

}

export default ResetButton;