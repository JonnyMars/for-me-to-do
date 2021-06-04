import React from 'react'
import styles from "./FloatingInput.module.scss";


export default function FloatingInput(props) {

    return ( 
        <div className={styles.FloatingInput}>
            <input 
                className={styles.Input} 
                autoComplete={props.autoComplete ? props.autoComplete : "on"} 
                name={props.inputname} 
                placeholder={props.placeholder} 
                value={props.value} 
                onChange={props.change} 
            />
            <label className={styles.Label} htmlFor={props.inputname}>
                {props.placeholder}
            </label>
        </div>
    )
}
