import React from 'react'
import Button from '../UI/Button/Button';
import styles from "./Navigation.module.scss";


export default function Navigation(props) {

    function onLogin() {
        console.log("Login")
    }


    const actionBtn = <Button clicked={onLogin} >Login</Button>

    return (
        <nav className={`${styles.Navigation} full-width`}>
            <div className={`container flex ${styles.Container}`}>
                <a className={styles.Logo} href="/">
                    <span>For</span>
                    <span>Me</span>
                    <span>To</span>
                    <span>Do</span>
                </a>
                {actionBtn}
            </div>
        </nav>
    )
}
