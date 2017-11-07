import React, { Component } from 'react';
import io from 'socket.io-client';
import './App.css';

const socket = io('http://localhost:3001');

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { value: '' };

    socket.on('new.message', data => {
      console.log(data);
    });
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  submit() {
    console.log(`emmiting: ${this.state.value}`);
    socket.emit('new.message', this.state.value);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to the chat</h1>
          <form action="#" onSubmit={this.submit.bind(this)}>
            <input type="text" value={this.state.value} onChange={this.handleChange.bind(this)} />
            <button type="submit">go</button>
          </form>
        </header>
      </div>
    );
  }
}

export default App;
