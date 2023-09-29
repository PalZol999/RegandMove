import { initializeApp,  } from "firebase/app";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDE8dSfTpdQgAZPpXROozk2hX412gwNlSc",
  authDomain: "sheyhealthy-lite-class.firebaseapp.com",
  projectId: "sheyhealthy-lite-class",
  storageBucket: "sheyhealthy-lite-class.appspot.com",
  messagingSenderId: "429758493964",
  appId: "1:429758493964:web:a6755274e98cf56151c529",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firestoreDatabase = getFirestore(app);

export default firestoreDatabase;
