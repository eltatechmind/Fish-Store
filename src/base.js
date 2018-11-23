import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyA7WSVg0PUwevXha14oTGnZJ3Ty2wKYeAU",
    authDomain: "catch-of-the-day-9c358.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-9c358.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

//This is a named export
export { firebaseApp};

//this is a default export
export default base;