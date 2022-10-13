import { useState, useContext, createContext } from "react"
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
} from "firebase/auth";
import { auth } from "./firebase-config";

export const authContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });

    const register = async (registerEmail, registerPassword) => {
        try {
            const response = await createUserWithEmailAndPassword(
                auth,
                registerEmail,
                registerPassword
            );
            return response
        } catch (error) {
            console.log(error.message);
            return null
        }
    };

    const login = async (loginEmail, loginPassword) => {
        try {
            const response = await signInWithEmailAndPassword(
                auth,
                loginEmail,
                loginPassword
            );
            return response
        } catch (error) {
            console.log(error.message);
            return null
        }
    };

    const logout = async () => {
        setUser(null)
        await signOut(auth);
    };

    return (
        <authContext.Provider value={{ user, setUser, login, logout, register }}>
            {children}
        </authContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(authContext)
}