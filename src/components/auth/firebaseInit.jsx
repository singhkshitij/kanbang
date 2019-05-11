import Firebase from 'firebase';

const firebaseInit = Firebase.initializeApp({
  apiKey: 'AIzaSyAPah9fgXnPwpBirt2WUER-qO7XevS19X4',
  authDomain: 'scrum-board-39e8f.firebaseapp.com',
  databaseURL: 'https://scrum-board-39e8f.firebaseio.com',
  projectId: 'scrum-board-39e8f',
  storageBucket: 'scrum-board-39e8f.appspot.com',
  messagingSenderId: '909585498611'
});

export default firebaseInit;
