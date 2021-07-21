import React from 'react';
import Footer from '../../_components/Footer/Footer';
import Navigation from '../../_components/Navigation/Navigation';
import styles from "./Layout.module.scss";

export default function Layout(props) {
    return (
        <div className={ styles.Layout }>
            <div className="site-container">
                <Navigation />
                {props.children}
            </div>
            <Footer />
        </div>
    )
}
