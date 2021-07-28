import React from 'react'
import { Link } from 'react-router-dom';
import styles from "./Footer.module.scss";

export default function Footer() {


    return (
        <footer className={`container ${styles.Footer} flex`}>
            <p>Designed and developed by <a href="https://jonnymars.uk/" target="_blank" rel="noreferrer">Jonny Mars</a></p>
            <Link to="/privacy-policy">Privacy Policy</Link>
        </footer>
    )
}
