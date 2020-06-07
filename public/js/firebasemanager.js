const firebaseConfig = {
    apiKey: "AIzaSyBQfxqDt6pmn-Tm-d2iQmQIDQps8gKC8GI",
    authDomain: "cine-polling.firebaseapp.com",
    databaseURL: "https://cine-polling.firebaseio.com",
    projectId: "cine-polling",
    storageBucket: "cine-polling.appspot.com",
    messagingSenderId: "300044700683",
    appId: "1:300044700683:web:4aa5331452e0a7cc420b0e",
    measurementId: "G-PLEFSGD3PP"
  };

firebase.initializeApp(firebaseConfig);
var defaultStorage = firebase.storage();
var defaultFirestore = firebase.firestore();