import React, { Component } from 'react';
import TodoApp from './components/todo/TodoApp';
import './App.css';
import './bootstrap.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/*<Counter />*/}
        <TodoApp />
      </div>
    );
  }
}

/*class Learning extends Component {
  render() {
    return (
      <div className="Learning">
        <h1>My ToDo Application</h1>
        <FirstComponent></FirstComponent>
        <SecondComponent></SecondComponent>
        <ThirdComponent></ThirdComponent>
      </div>
    );
  }
}*/

export default App;