import React from 'react'
import styles from "./ListActionButton.module.scss";

export default function ListActionButton(props) {

    let appropriate_class;

    switch( props.type ) {
        case "TICK":
            appropriate_class = styles.Tick;
            break;
        case "CROSS":
            appropriate_class = styles.Cross;
            break;
        case "CHEVRON":
            appropriate_class = styles.Chevron;
            break;
        case "UP": 
            appropriate_class = styles.UpArrow;
            break;
        default:
            return null;
    }


    return (
        <button 
            className={[styles.ListActionButton, appropriate_class].join(" ")} 
            onClick={props.click} 
            title={props.title ? props.title : ""}
        >
        </button>
    )
}
