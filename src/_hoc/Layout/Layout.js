import React from 'react';
import Navigation from '../../_components/Navigation/Navigation';
import styles from "./Layout.module.scss";

export default function Layout(props) {
    return (
        <div className={ styles.Layout }>
            <Navigation />
            {props.children}
        </div>
    )
}
