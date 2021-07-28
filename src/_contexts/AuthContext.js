import React, { useContext, useState } from 'react'

import { FIREBASE_WEB_KEY } from "../common/utility";

const FIREBASE_ID_TOKEN = "firebaseUserIdToken";
const FIREBASE_UID_TOKEN = "firebaseUserUidToken";
const FIREBASE_EXPIRY_TIME = "firebaseUserExpiryTime";
const FIREBASE_REFRESH_TOKEN = "firebaseRefreshToken";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({children}) {

    const [currentUser, setCurrentUser] = useState(authDetails());

    function signUp({email, password, onSuccess, onFail}) {

        fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_WEB_KEY}`,{
                method: "POST",
                body: JSON.stringify({
                    "email": email,
                    "password": password,
                    "returnSecureToken": true
                })
            })
            .then(response => response.json())
            .then(data => {
    
                
                if(data.idToken) window.localStorage.setItem(FIREBASE_ID_TOKEN, data.idToken);
                if(data.localId) window.localStorage.setItem(FIREBASE_UID_TOKEN, data.localId);
                if(data.expiresIn) {
                    const expirationDate = new Date(new Date().getTime() + (data.expiresIn * 1000));
                    window.localStorage.setItem(FIREBASE_EXPIRY_TIME, expirationDate);
                    checkAuthTimeout(data.expiresIn)
                }
                if(data.refreshToken) window.localStorage.setItem(FIREBASE_REFRESH_TOKEN, data.refreshToken);
    
                onSuccess(data)
                setCurrentUser(authDetails())
            })
            .catch(error => onFail(error))
    
    }

    function logIn({email, password, onSuccess, onFail}) {

        fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_WEB_KEY}`,{
                method: "POST",
                body: JSON.stringify({
                    "email": email,
                    "password": password,
                    "returnSecureToken": true
                })
            })
            .then(response => response.json())
            .then(data => {

                if(data.idToken) window.localStorage.setItem(FIREBASE_ID_TOKEN, data.idToken);
                if(data.localId) window.localStorage.setItem(FIREBASE_UID_TOKEN, data.localId);
                if(data.expiresIn) {
                    const expirationDate = new Date(new Date().getTime() + (data.expiresIn * 1000));
                    window.localStorage.setItem(FIREBASE_EXPIRY_TIME, expirationDate);
                    checkAuthTimeout(data.expiresIn)
                }
                if(data.refreshToken) window.localStorage.setItem(FIREBASE_REFRESH_TOKEN, data.refreshToken);
                
                onSuccess(data)
                setCurrentUser(authDetails())
            })
            .catch(error => onFail(error))
    
    }

    // function refreshAuth() {

    //     const {refreshToken} = authDetails();
    
    //     fetch(`https://securetoken.googleapis.com/v1/token?key=${FIREBASE_WEB_KEY}`, {
    //         method:"POST",
    //         body: JSON.stringify({
    //             grant_type: "refresh_token",
    //             refresh_token: refreshToken
    //         })
    //     })
    //     .then(response => response.json())
    //     .then(data => {

    //         if(data.id_token) window.localStorage.setItem(FIREBASE_ID_TOKEN, data.id_token);
    //         if(data.user_id) window.localStorage.setItem(FIREBASE_UID_TOKEN, data.user_id);
    //         if(data.expires_in) {
    //             const expirationDate = new Date(new Date().getTime() + (data.expires_in * 1000));
    //             window.localStorage.setItem(FIREBASE_EXPIRY_TIME, expirationDate);
    //             checkAuthTimeout(data.expires_in)
    //         }
    //         if(data.refresh_token) window.localStorage.setItem(FIREBASE_REFRESH_TOKEN, data.refresh_token);
    //         setCurrentUser(authDetails())
    //     })
    
    // }

    function authDetails() {

        const token = window.localStorage.getItem(FIREBASE_ID_TOKEN);
        const userId = window.localStorage.getItem(FIREBASE_UID_TOKEN);
        const expirationDate = window.localStorage.getItem(FIREBASE_EXPIRY_TIME);
        const refreshToken = window.localStorage.getItem(FIREBASE_REFRESH_TOKEN);

        if(!token || !userId || !expirationDate || !refreshToken) return null;

        return {
            token,
            userId,
            expirationDate,
            refreshToken
        }
    
    }

    function checkAuthTimeout(expirationTime) {

        setTimeout(() => {
            logOut();
            setCurrentUser(null)
        }, expirationTime * 1000)
        
    }

    function logOut(cb) {

        window.localStorage.removeItem(FIREBASE_ID_TOKEN);
        window.localStorage.removeItem(FIREBASE_UID_TOKEN);
        window.localStorage.removeItem(FIREBASE_EXPIRY_TIME);
        window.localStorage.removeItem(FIREBASE_REFRESH_TOKEN);
        setCurrentUser(null)
    
        if(cb) cb();
        
    }
    
    const value = {
        currentUser,
        signUp, 
        logIn,
        logOut,
        authDetails
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
