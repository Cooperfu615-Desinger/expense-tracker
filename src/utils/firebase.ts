import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBk7i8KT0gr3FI4PqFIzyAa3IYIxNgv8HE",
    authDomain: "expense-tracker-98af0.firebaseapp.com",
    projectId: "expense-tracker-98af0",
    storageBucket: "expense-tracker-98af0.firebasestorage.app",
    messagingSenderId: "582994906000",
    appId: "1:582994906000:web:3f50632263dd7c65324115",
    measurementId: "G-J8KZHRMESM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
