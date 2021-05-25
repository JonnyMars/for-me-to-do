import React from 'react'
import styles from "./Button.module.scss"

export default function Button(props) {

    const btnClasses = [
        styles.Button,
        props.btnType ? styles[props.btnType] : styles.Default
    ].join(" ");

    return (
        <button
            onClick={props.clicked}
            className={btnClasses}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    )
}
