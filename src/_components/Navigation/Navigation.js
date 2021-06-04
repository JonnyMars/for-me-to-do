import React from 'react'
import { Link } from 'react-router-dom';
import styles from "./Navigation.module.scss";


export default function Navigation(props) {

    const actionBtn = <Link to="login" className={styles.LoginButton}>Login</Link>

    return (
        <nav className={`${styles.Navigation} full-width`}>
            <div className={`container flex ${styles.Container}`}>
                <Link className={styles.Logo} to="/">
                    <span>For</span>
                    <span>Me</span>
                    <span>To</span>
                    <span>Do</span>
                </Link>
                {actionBtn}
            </div>
        </nav>
    )
}
