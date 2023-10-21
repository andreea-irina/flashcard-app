// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getDatabase} from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBgUJs2rKfOvKrkujQlyRx9DdDLRmPihhg',
  authDomain: 'flashcard-app-a4aa1.firebaseapp.com',
  databaseURL:
    'https://flashcard-app-a4aa1-default-rtdb.europe-west1.firebasedatabase.app/',
  projectId: 'flashcard-app-a4aa1',
  storageBucket: 'flashcard-app-a4aa1.appspot.com',
  messagingSenderId: '255674196775',
  appId: '1:255674196775:web:935a039cbb91b07010ff02',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export {db};
