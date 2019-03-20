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
    var ref = fire.database().ref();
    var datesRef = ref.child('RaptorAttacks');
    datesRef.on('value', (snap) => {
      var latestEndDateTime = new Date(Object.values(snap.val()).sort((a, b) => a.endDateTime < b.endDateTime)[0].endDateTime);
      this.calcDays(latestEndDateTime);
    });
  }

  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={raptor} alt='' className='Header-image'></img>
          <p>
            Days since last raptor attack:
          </p>
        </header>
        <div className='App-body'>
        {this.state.days}
        <button onClick={this.getCurrentKeyThenPush} className="Button">Reset Counter</button>
        </div>
      </div>
    );
  }

  pushToDB = (currentCountKey) => {
    
    fire.database().ref('RaptorAttacks/' + currentCountKey).update({endDateTime: new Date().getTime()});
    fire.database().ref('RaptorAttacks').push({startDateTime: new Date().getTime()});
  }

  getCurrentKeyThenPush = () => {
    //return;
    var ref = fire.database().ref();
    var datesRef = ref.child('RaptorAttacks');
    datesRef.limitToLast(1).once('value', (snap) => {this.pushToDB(Object.keys(snap.val())[0])})
  }

  calcDays = (latestEndDateTime) => {
    const oneDay = 24*60*60*1000;
    var today = new Date();
    var daysSinceLastAttack = Math.round(Math.abs(((today.getTime() - latestEndDateTime)/(oneDay))))
    this.setState({days: daysSinceLastAttack})
  }

  resetPastDates = () => {
    var one = {endDateTime: (new Date().setDate(new Date().getDate()-18)), startDateTime:(new Date().setDate(new Date().getDate()-21))};
    var two = {endDateTime: (new Date().setDate(new Date().getDate()-21)), startDateTime:(new Date().setDate(new Date().getDate()-76))};
    var three = {endDateTime: (new Date().setDate(new Date().getDate()-76)), startDateTime:(new Date().setDate(new Date().getDate()-99))};
    var four = {endDateTime: (new Date().setDate(new Date().getDate()-99)), startDateTime:(new Date().setDate(new Date().getDate()-130))};
    var five = {endDateTime: (new Date().setDate(new Date().getDate()-130)), startDateTime:(new Date().setDate(new Date().getDate()-137))};
    var six = {endDateTime: (new Date().setDate(new Date().getDate()-137)), startDateTime:(new Date().setDate(new Date().getDate()-144))};
    var seven = {endDateTime: (new Date().setDate(new Date().getDate()- 144)), startDateTime:(new Date().setDate(new Date().getDate()-151))};
    var eight = {endDateTime: (new Date().setDate(new Date().getDate()-151)), startDateTime:(new Date().setDate(new Date().getDate()-158))};
    var nine = {endDateTime: (new Date().setDate(new Date().getDate()-158)), startDateTime:(new Date().setDate(new Date().getDate()-192))};
    var whatever = [one, two, three, four, five, six, seven, eight, nine];
    whatever.forEach(function(obj) {fire.database().ref('RaptorAttacks').push(obj)})
  }
}

export default App;
