import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import fire from './fire'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { messages: [] }; // <- set up react state
  }

  componentWillMount(){
    
    //var userId = fire.auth().currentUser.uid;
    //var x = new Date().getTime();
    //fire.database().ref('/').push({time: x}).then(console.log('done'))
    // var ref = fire.database().ref('some/path');
    // var obj = {someAttribute: true};

    // ref.push(obj);

    var ref = fire.database().ref();
    var usersRef = ref.child('users');
    var user;
    usersRef.on('value', function (snap) {
      console.log(snap.val());
});

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
