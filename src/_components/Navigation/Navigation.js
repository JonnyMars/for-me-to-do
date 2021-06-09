import React from 'react'
import { Link } from 'react-router-dom';
import styles from "./Navigation.module.scss";


export default function Navigation(props) {

    const signupBtn = <Link to="signup" className={[styles.Button, styles.SignUpButton].join(" ")}>Sign Up</Link>
    const loginBtn = <Link to="login" className={styles.Button}>Login</Link>

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
                    {signupBtn}
                    {loginBtn}
                </div>
            </div>
        </nav>
    )
}
