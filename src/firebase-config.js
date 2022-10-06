import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { apiKey } from "../env";

const firebaseConfig = {
    apiKey: apiKey,
    authDomain: "enterprise-programming-336c5.firebaseapp.com",
    projectId: "enterprise-programming-336c5",
    storageBucket: "enterprise-programming-336c5.appspot.com",
    messagingSenderId: "1077056591621",
    appId: "1:1077056591621:web:3819dead97fd45d23dc96c"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);