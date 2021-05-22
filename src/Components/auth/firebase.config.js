import firebase from 'firebase';
var firebaseConfig = {
    apiKey: "AIzaSyAJNKmxmXSpd2NYYtVkzLcvdPPVWssWIEA",
    authDomain: "e-commerce-client-a9a8a.firebaseapp.com",
    projectId: "e-commerce-client-a9a8a",
    storageBucket: "e-commerce-client-a9a8a.appspot.com",
    messagingSenderId: "832278691027",
    appId: "1:832278691027:web:bd1cd525ac63b93123a826"
  };
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()