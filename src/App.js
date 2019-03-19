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

  componentWillMount() {

    //var userId = fire.auth().currentUser.uid;

    // ref.push(obj);
    var ref = fire.database().ref();
    var usersRef = ref.child('RaptorAttacks');
    usersRef.on('value',  (snap) => {
      var latestEndDateTime = new Date(Object.values(snap.val()).sort((a, b) => a.endDateTime < b.endDateTime)[0].endDateTime);
      this.calcDays(latestEndDateTime);
    });
    //this.pushToDB();
    
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
        <div className='App-body'>
        {this.state.days}
        <a href="something" className="Button">Reset Counter</a>
        </div>
      </div>
    );
  }

  pushToDB() {
    var one = {endDateTime: (new Date().setDate(new Date().getDate()-17)), startDateTime:(new Date().setDate(new Date().getDate()-20))};
    var two = {endDateTime: (new Date().setDate(new Date().getDate()-20)), startDateTime:(new Date().setDate(new Date().getDate()-75))};
    fire.database().ref('RaptorAttacks').push(two) //Adds object to RaptorAttacks, this is to add previous code red dates
    //Should get most recent raptor attack, and determine days since last by start date. Then when reset, add endate and create new entry
  }

  calcDays(latestEndDateTime){
    
    const oneDay = 24*60*60*1000;
    var today = new Date();
    var daysSinceLastAttack =  Math.round(Math.abs(((today.getTime() - latestEndDateTime)/(oneDay))))
    this.setState({days: daysSinceLastAttack})
  }
}

export default App;
