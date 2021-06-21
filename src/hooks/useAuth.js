import { FIREBASE_WEB_KEY } from "../common/utility";

const FIREBASE_ID_TOKEN = "firebaseUserIdToken";
const FIREBASE_UID_TOKEN = "firebaseUserUidToken";
const FIREBASE_EXPIRY_TIME = "firebaseUserExpiryTime";

let IS_LOGGED_IN;

export default function useAuth() {

    return {
        signUp: signUp,
        logIn: logIn,
        logOut: logOut,
        authCheckState: authCheckState,
        isAuthenticated: isAuthenticated,
        authDetails: authDetails
    }

}

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

            onSuccess(data)
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
            
            onSuccess(data)
        })
        .catch(error => onFail(error))

}

function logOut(cb) {

    window.localStorage.removeItem(FIREBASE_ID_TOKEN);
    window.localStorage.removeItem(FIREBASE_UID_TOKEN);
    window.localStorage.removeItem(FIREBASE_EXPIRY_TIME);
    IS_LOGGED_IN = false;

    if(cb) cb();
    
}

function authCheckState() {

    const {token, userId, expirationDate: _expirationDate} = authDetails();

    let expirationDate = _expirationDate;

    if(!token || !userId || !expirationDate) {
        logOut();
    } else {

        expirationDate = new Date(expirationDate);

        if(expirationDate <= new Date()) {
            logOut();
        } else {
            checkAuthTimeout( (expirationDate.getTime() - new Date().getTime()) / 1000 )
            console.log("AUTH SUCCESS");
        }

    }

}

function isAuthenticated() {

    if(IS_LOGGED_IN) return true

    const {token, userId, expirationDate} = authDetails();

    if(!token || !userId || !expirationDate) return false;

    IS_LOGGED_IN = true;
    
    return true;
    
}

function authDetails() {

    const token = window.localStorage.getItem(FIREBASE_ID_TOKEN);
    const userId = window.localStorage.getItem(FIREBASE_UID_TOKEN);
    const expirationDate = window.localStorage.getItem(FIREBASE_EXPIRY_TIME);

    return {
        token,
        userId,
        expirationDate
    }

}

function checkAuthTimeout(expirationTime) {
    console.log(expirationTime)
    setTimeout(() => {
        logOut();
    }, expirationTime * 1000)

    console.log("EXPIRES AT: ", new Date(new Date().getTime() + (expirationTime * 1000)))
}