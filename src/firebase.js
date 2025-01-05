// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYyHELwIbxPm00blj8lzXaJW7WGtj9Vqs",
  authDomain: "korvais.firebaseapp.com",
  projectId: "korvais",
  storageBucket: "korvais.firebasestorage.app",
  messagingSenderId: "903831796663",
  appId: "1:903831796663:web:ad51410d4ae79066d58632",
  measurementId: "G-JTHK5D262T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
