import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyBNa2knYFj5wvC-CsT_UxEDoUSgdpP3YZw",
  authDomain: "ibizo-prime.firebaseapp.com",
  projectId: "ibizo-prime",
  storageBucket: "ibizo-prime.appspot.com",
  messagingSenderId: "462701326918",
  appId: "1:462701326918:web:32011f521e928935d79047",
  measurementId: "G-RXJ03DPCNR",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
