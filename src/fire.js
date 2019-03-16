import firebase from 'firebase'

  var config = {
    apiKey: "AIzaSyA-J1fX9rdY4WgLnzRXRIgFEt_PbMDS_cU",
    authDomain: "raptorattackcounter.firebaseapp.com",
    databaseURL: "https://raptorattackcounter.firebaseio.com",
    projectId: "raptorattackcounter",
    storageBucket: "raptorattackcounter.appspot.com",
    messagingSenderId: "89622407565"
  };
  
  var fire = firebase.initializeApp(config);
  export default fire;