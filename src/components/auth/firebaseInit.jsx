import Firebase from 'firebase';

const firebaseInit = Firebase.initializeApp({
  apiKey: '<ENTER YOU CRED>',
  authDomain: '<ENTER YOU CRED>',
  databaseURL: '<ENTER YOU CRED>',
  projectId: '<ENTER YOU CRED>',
  storageBucket: '<ENTER YOU CRED>',
  messagingSenderId: '<ENTER YOU CRED>'
});

export default firebaseInit;
