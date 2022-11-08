import { useState, useContext, createContext } from "react"
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
} from "firebase/auth";
import { auth } from "./firebase-config";
import { toast } from 'react-toastify';

export const authContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useLocalStorage('uid', null)

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
            toast(error.message);
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
            toast(error.message);
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

function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        if (typeof window === "undefined") {
            return initialValue;
        }

        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            toast(error);
            return initialValue;
        }
    });

    const setValue = (value) => {
        try {
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            if (typeof window !== "undefined") {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            }
        } catch (error) {
            toast(error);
        }
    };

    return [storedValue, setValue];
}