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

    const extraClasses = props.extraClasses ? props.extraClasses : ""
    const classes = [styles.ListActionButton, appropriate_class].join(" ") + ` ${extraClasses}`;


    return (
        <button 
            className={classes} 
            onClick={props.clicked} 
            title={props.title ? props.title : ""}
        >
        </button>
    )
}
