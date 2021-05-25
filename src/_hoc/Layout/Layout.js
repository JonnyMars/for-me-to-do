import React from 'react';
import styles from "./Layout.module.scss";

export default function Layout(props) {
    return (
        <div className={ styles.Layout }>
            {props.children}
        </div>
    )
}
