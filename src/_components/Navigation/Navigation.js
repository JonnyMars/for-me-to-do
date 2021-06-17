import React from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import styles from "./Navigation.module.scss";
import Button from "../UI/Button/Button";


export default function Navigation(props) {

    const {isAuthenticated, logOut} = useAuth();
    const history = useHistory();
    const location = useLocation();
    
    let authBtn = <Link to="login" className={styles.Button}>Login / Sign Up</Link>

    if(isAuthenticated()) {
        authBtn = <Button
                    clicked={() => {logOut(() => history.push("/"))}} 
                    >
                        Logout
                </Button>;
    }

    if(location.pathname === ("/login" || "/signup")) authBtn = null;


    return (
        <nav className={`${styles.Navigation} full-width`}>
            <div className={`container flex ${styles.Container}`}>
                <Link className={styles.Logo} to="/">
                    <span>For</span>
                    <span>Me</span>
                    <span>To</span>
                    <span>Do</span>
                </Link>
                <div>
                    {authBtn}
                </div>
            </div>
        </nav>
    )
}
