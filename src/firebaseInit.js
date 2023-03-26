import { initializeApp } from "firebase/app";
import { getAuth, FacebookAuthProvider, signInWithRedirect  } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBh_ylGXHGZvhsCQnh4hTnOqAtjDkp_w9k",
  authDomain: "xluziv-35a2d.firebaseapp.com",
  databaseURL: "https://xluziv-35a2d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "xluziv-35a2d",
  storageBucket: "xluziv-35a2d.appspot.com",
  messagingSenderId: "756227747487",
  appId: "1:756227747487:web:dee0bbb2c4ce260eb87caa",
  measurementId: "G-YQDW23HPRZ"
}

const app = initializeApp(firebaseConfig);
const $auth = getAuth(app);
const $db = getFirestore(app);


// Export the Firebase Authentication instance
// Export the Firebase Realtime Database instance
export { $auth, $db, FacebookAuthProvider, signInWithRedirect };