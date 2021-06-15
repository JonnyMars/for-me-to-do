import React from 'react'
import styles from "./Backdrop.module.scss";


export default function Backdrop(props) {
    

    if(!props.show) return null;

    return (
        <div className={styles.Backdrop} onClick={props.clicked}>

        </div>
    )
}
