import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyD0wsNwyrCBPZ5Wu9ijTzgslqbqlaZVwnE',
  authDomain: 'events-app-f75d4.firebaseapp.com',
  projectId: 'events-app-f75d4',
  storageBucket: 'events-app-f75d4.appspot.com',
  messagingSenderId: '1041115577578',
  appId: '1:1041115577578:web:fc50b82e4a733b3e78ab93',
  measurementId: 'G-B3PYE6L5B7',
};

const app = initializeApp(firebaseConfig);
if (typeof window !== 'undefined') {
  getAnalytics(app);
}

export const db = getFirestore(app);
// connectFirestoreEmulator(db, 'localhost', 8080);
export const auth = getAuth(app);
// connectAuthEmulator(auth, 'http://localhost:9099');
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async (): Promise<User> => {
  const res = await signInWithPopup(auth, googleProvider);
  return res.user;
};

export const logout = () => signOut(auth);
