import React, { Component } from 'react';
import raptor from './images/raptor_flipped.png';
import './App.css';
import fire from './fire'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { days: 0 }; 
    this.setState = this.setState.bind(this)
  }

  componentDidMount() {

    //var userId = fire.auth().currentUser.uid;

    // ref.push(obj);
    var ref = fire.database().ref();
    var usersRef = ref.child('RaptorAttacks/-La7kJTwyJg3Bjvo3em7');
    usersRef.on('value',  (snap) => {
      this.setState({days: snap.val().time});
    });
    
  }

  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={raptor} alt='' className='Header-image'></img>
          <p>
            Days since last raptor attack :
          </p>
        </header>
        <body className='App-body'>{this.calcDays()}</body>
      </div>
    );
  }

  pushToDB() {
    var x = new Date().getTime();
    fire.database().ref('RaptorAttacks').push({startTime: x}) //Adds object to RaptorAttacks, this is to add previous code red dates
    //Should get most recent raptor attack, and determine days since last by start date. Then when reset, add endate and create new entry
  }

  calcDays(){
    
    const oneDay = 24*60*60*1000;
    var today = new Date();
    var x =  Math.round(Math.abs(((today.getTime() - this.state.days)/(oneDay))))
    return x;

  }
}

export default App;
