import React from 'react'
import styles from "./NavigationSidebar.module.scss";
import Backdrop from "../../UI/Backdrop/Backdrop";


export default function NavigationSidebar(props) {

    
    const sidebarClasses = [styles.NavSidebar];
    
    if(props.show) {
        sidebarClasses.push(
            styles.NavSidebarShow
        )
    }

    return (
        <>
            <div className={`${sidebarClasses.join(" ")} flex flex-wrap`}>
                {props.logoLink}
                <div className={styles.NavSidebarActions}>
                    {props.children}
                </div>
            </div>
            <Backdrop show={props.show} clicked={props.close} />
        </>
    )
}
