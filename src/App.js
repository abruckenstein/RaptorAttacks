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
    var usersRef = ref.child('RaptorAttacks');
    usersRef.on('value',  (snap) => {
      console.log(new Date(Object.values(snap.val()).sort((a, b) => a.endDateTime < b.endDateTime)[0].endDateTime));
      this.setState({days: snap.val()});
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
        <body className='App-body'>{this.calcDays()}</body>
      </div>
    );
  }

  pushToDB() {
    var one = {endDateTime: (new Date().setDate(new Date().getDate()-17)), startDateTime:(new Date().setDate(new Date().getDate()-20))};
    var two = {endDateTime: (new Date().setDate(new Date().getDate()-20)), startDateTime:(new Date().setDate(new Date().getDate()-75))};
    fire.database().ref('RaptorAttacks').push(two) //Adds object to RaptorAttacks, this is to add previous code red dates
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
