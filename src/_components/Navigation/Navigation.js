import React, { useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import styles from "./Navigation.module.scss";
import Button from "../UI/Button/Button";
import NavigationSidebar from "./NavigationSidebar/NavigationSidebar";

export default function Navigation(props) {

    const {isAuthenticated, logOut} = useAuth();
    const history = useHistory();
    const location = useLocation();

    const [mobileNavOpen, setMobileNavOpen] = useState(false);


    function openMobileNav() {
        setMobileNavOpen(true);
    }

    function closeMobileNav() {
        setMobileNavOpen(false);
    }



    
    let navLinks = <Link to="login" className={styles.Button} onClick={closeMobileNav}>Login / Sign Up</Link>

    if(isAuthenticated()) {
        navLinks = (
                <>
                    <Link className={styles.NavLink} onClick={closeMobileNav} to="/tasks">Tasks</Link>
                    <Button
                        clicked={() => {
                            logOut(() => history.push("/"))
                            closeMobileNav();
                            }
                        } 
                        >
                            Logout
                    </Button>
                </>
        );
    }

    const logo = (
        <Link className={styles.Logo} to="/" onClick={closeMobileNav}>
            <span>For</span>
            <span>Me</span>
            <span>To</span>
            <span>Do</span>
        </Link>
    )

    let mobileNav = (
        <>
                <button className={styles.MobileNavAction} onClick={openMobileNav}>
                    <span className={styles.BurgerMenu}></span>
                </button>
                <NavigationSidebar logoLink={logo} show={mobileNavOpen} close={closeMobileNav}>
                    {navLinks}    
                </NavigationSidebar>
        </>
    )

    if(location.pathname === ("/login" || "/signup")) {
        mobileNav = null;
        navLinks = null;
    } 

    return (
        <nav className={`${styles.Navigation} full-width`}>
            <div className={`container flex ${styles.Container}`}>
                {logo}
                <div className={styles.NavActionContainer}>
                    {navLinks}
                </div>
                {mobileNav}
            </div>
        </nav>
    )
}
