import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore';

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
export const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, 'users'), where('email', '==', user.email));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      throw new Error('Not Authorized');
      // await addDoc(collection(db, 'users'), {
      //   uid: user.uid,
      //   name: user.displayName,
      //   authProvider: 'google',
      //   email: user.email,
      // });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export const logout = () => signOut(auth);
