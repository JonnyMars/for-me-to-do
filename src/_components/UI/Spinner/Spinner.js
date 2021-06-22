import React from 'react'
import styles from "./Spinner.module.scss";

export default function Spinner(props) {

    let spinnerClasses = [styles.Spinner];
    if(props.color) {
        spinnerClasses.push(styles[props.color])
    }

    return (
        <div className={`${styles.SpinnerContainer} flex flex-center`}>
            <div className={`${spinnerClasses.join(" ")} flex flex-center`}>
            </div>
        </div>
    )
}
