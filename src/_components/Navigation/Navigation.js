import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import styles from "./Navigation.module.scss";


export default function Navigation(props) {
    
    let loginBtn = <Link to="login" className={styles.Button}>Login / Sign Up</Link>

    const location = useLocation();
    if(location.pathname === ("/login" || "/signup")) loginBtn = null;


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
                    {loginBtn}
                </div>
            </div>
        </nav>
    )
}
