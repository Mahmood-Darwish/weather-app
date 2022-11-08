import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { apiKey } from "../../env";
import "firebase/database";
import firebase from 'firebase/compat/app';
import { getDatabase } from "firebase/database";


const firebaseConfig = {
    apiKey: apiKey,
    authDomain: "enterprise-programming-336c5.firebaseapp.com",
    projectId: "enterprise-programming-336c5",
    storageBucket: "enterprise-programming-336c5.appspot.com",
    messagingSenderId: "1077056591621",
    appId: "1:1077056591621:web:3819dead97fd45d23dc96c",
    databaseURL: `https://enterprise-programming-336c5-default-rtdb.europe-west1.firebasedatabase.app`,
    projectId: "enterprise-programming-336c5"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

function initFirebase() {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
}

initFirebase();
const database = getDatabase();

export { database };