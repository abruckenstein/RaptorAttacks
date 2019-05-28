import React, { Component } from "react";
import raptor from "./images/raptor_flipped.png";
import "./App.css";
import fire from "./fire";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { days: 0 };
    // this.setState = this.setState.bind(this)
  }

  componentWillMount() {
    this.getLatestEndDate();
    this.interval = setInterval(() => this.getLatestEndDate(), 1800000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={raptor} alt="" className="Header-image" />
          <p>Days since last raptor attack:</p>
        </header>
        <div className="App-body">
          <div className="Sidebar">blah</div>
          <div>
            <div>
            {this.state.days}
            </div>
            <button onClick={this.getCurrentKeyThenPush} className="Button">
              Reset Counter
            </button>
          </div>
        </div>
      </div>
    );
  }

  pushToDB = currentCountKey => {
    fire
      .database()
      .ref("RaptorAttacks/" + currentCountKey)
      .update({ endDateTime: new Date().getTime() });
    fire
      .database()
      .ref("RaptorAttacks")
      .push({ startDateTime: new Date().getTime() });
  };

  getCurrentKeyThenPush = () => {
    //return;
    var ref = fire.database().ref();
    var datesRef = ref.child("RaptorAttacks");
    datesRef.limitToLast(1).once("value", snap => {
      this.pushToDB(Object.keys(snap.val())[0]);
    });
  };

  calcDays = latestEndDate => {
    const oneDay = 24 * 60 * 60 * 1000;
    var today = new Date();
    var daysSinceLastAttack = Math.round(
      Math.abs((today.getTime() - latestEndDate) / oneDay)
    );
    this.setState({ days: daysSinceLastAttack });
  };

  getLatestEndDate = () => {
    var ref = fire.database().ref();
    var datesRef = ref.child("RaptorAttacks");
    var latestEndDate = null;
    datesRef.on("value", snap => {
      var dates = Object.values(snap.val());
      const latestEndDate = dates
        .filter(it => it.endDateTime)
        .map(it => it.endDateTime)
        .sort((a, b) => (a < b ? 1 : -1))[0];
      this.calcDays(new Date(latestEndDate));
    });
  };

  resetPastDates = () => {
    var one = {
      endDateTime: new Date().setDate(new Date().getDate() - 18),
      startDateTime: new Date().setDate(new Date().getDate() - 21)
    };
    var two = {
      endDateTime: new Date().setDate(new Date().getDate() - 21),
      startDateTime: new Date().setDate(new Date().getDate() - 76)
    };
    var three = {
      endDateTime: new Date().setDate(new Date().getDate() - 76),
      startDateTime: new Date().setDate(new Date().getDate() - 99)
    };
    var four = {
      endDateTime: new Date().setDate(new Date().getDate() - 99),
      startDateTime: new Date().setDate(new Date().getDate() - 130)
    };
    var five = {
      endDateTime: new Date().setDate(new Date().getDate() - 130),
      startDateTime: new Date().setDate(new Date().getDate() - 137)
    };
    var six = {
      endDateTime: new Date().setDate(new Date().getDate() - 137),
      startDateTime: new Date().setDate(new Date().getDate() - 144)
    };
    var seven = {
      endDateTime: new Date().setDate(new Date().getDate() - 144),
      startDateTime: new Date().setDate(new Date().getDate() - 151)
    };
    var eight = {
      endDateTime: new Date().setDate(new Date().getDate() - 151),
      startDateTime: new Date().setDate(new Date().getDate() - 158)
    };
    var nine = {
      endDateTime: new Date().setDate(new Date().getDate() - 158),
      startDateTime: new Date().setDate(new Date().getDate() - 192)
    };
    var whatever = [one, two, three, four, five, six, seven, eight, nine];
    whatever.forEach(function(obj) {
      fire
        .database()
        .ref("RaptorAttacks")
        .push(obj);
    });
  };
}

export default App;
