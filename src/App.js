import React, { Component } from 'react';
import raptor from './images/raptor_flipped.png';
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
    usersRef.on('value', function (snap) {
      console.log(snap.val());
});

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        <img src={raptor}></img>
          <p>
            Days since last raptor attack : 
          </p>
        </header>
        <body className="App-body">#XX</body>
      </div>
    );
  }
}

export default App;
