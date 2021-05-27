import React from 'react'
import styles from "./FloatingInput.module.scss";


export default function FloatingInput(props) {

    return ( 
        <div className={styles.FloatingInput}>
            <input className={styles.Input} name="input name" placeholder={props.placeholder} value={props.value} onChange={props.change} />
            <label className={styles.Label}>
                {props.placeholder}
            </label>
        </div>
    )
}
